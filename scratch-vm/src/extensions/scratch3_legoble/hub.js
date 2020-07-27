const BLE = require('../../io/ble');
const Base64Util = require('../../util/base64-util');
const MathUtil = require('../../util/math-util');
const RateLimiter = require('../../util/rateLimiter.js');

const log = require('../../util/log');

const IOType = require('./io-type');
const Device = require('./device');

let _TextDecoder;
if (typeof TextEncoder === 'undefined') {
    _TextDecoder = require('text-encoding').TextDecoder;
} else {
    _TextDecoder = TextDecoder;
}

const ServiceUUID = '00001623-1212-efde-1623-785feabcd123';
const CharacteristicUUID = '00001624-1212-efde-1623-785feabcd123';
const SendRateMax = 20;
const PollingInterval = 3000;

const MessageType = {
    HUB_PROPERTIES: 0x01,
    HUB_ATTACHED_IO: 0x04,
    GENERIC_ERROR_MESSAGES: 0x05,
    PORT_INPUT_FORMAT_SETUP: 0x41,
    PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
    PORT_VALUE: 0x45,
    PORT_VALUE_COMBINED: 0x46,
    PORT_OUTPUT_COMMAND: 0x81,
    PORT_OUTPUT_COMMAND_FEEDBACK: 0x82,
};

const HubPropertyReference = {
    ADVERTISING_NAME: 0x01,
    BUTTON: 0x02,
    FW_VERSION: 0x03,
    BATTERY_VOLTAGE: 0x06,
};

const HubPropertyOperation = {
    SET: 0x01,
    ENABLE_UPDATES: 0x02,
    DISABLE_UPDATES: 0x03,
    RESET: 0x04,
    REQUEST_UPDATE: 0x05,
    UPDATE: 0x06,
};

const numberToInt32Array = function (number) {
    const buffer = new ArrayBuffer(4);
    const dataview = new DataView(buffer);
    dataview.setInt32(0, number);
    return [
        dataview.getUint8(3),
        dataview.getUint8(2),
        dataview.getUint8(1),
        dataview.getUint8(0)
    ];
};

const numberToInt16Array = function (number) {
    const buffer = new ArrayBuffer(2);
    const dataview = new DataView(buffer);
    dataview.setInt16(0, number);
    return [
        dataview.getUint8(1),
        dataview.getUint8(0)
    ];
};

class Hub {

    constructor(runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;

        this._name = null;
        this._batteryLevel = 0;
        this._devices = [];

        this._outputCommandFeedbackCallback = [];
        this._outputCommandCompletionCallback = [];

        this._ble = null;
        this._runtime.registerPeripheralExtension(extensionId, this);
        this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

        this._rateLimiter = new RateLimiter(SendRateMax);

        this._pollingId = null;

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
    }

    get name() {
        return this._name;
    }

    get batteryLevel() {
        return this._batteryLevel;
    }

    // BLE

    scan() {
        if (this._ble) {
            this._ble.disconnect();
        }

        this._ble = new BLE(this._runtime, this._extensionId, {
            filters: [{
                services: [ServiceUUID],
                manufacturerData: {
                    0x0397: {
                        dataPrefix: []
                    }
                }
            }],
            optionalServices: []
        }, this._onConnect, this.reset);
    }

    connect(id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    disconnect() {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.reset();
    }

    isConnected() {
        let connected = false;
        if (this._ble) {
            connected = this._ble.isConnected();
        }
        return connected;
    }

    _onConnect() {
        this._ble.startNotifications(
            ServiceUUID,
            CharacteristicUUID,
            this._onMessage
        );

        setTimeout(() => {
            this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.ADVERTISING_NAME, HubPropertyOperation.ENABLE_UPDATES], false);
            this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.REQUEST_UPDATE]);
        }, 500);

        this._startPollingBatteryLevel();
    }

    _onMessage(base64) {
        const data = Base64Util.base64ToUint8Array(base64);
        this.logBytes(data, '<<');

        const length = data[0];
        if (length > 127) {
            log.warn(`Unsupported message length: ${length}`);
            return;
        }

        const messageType = data[2];
        switch (messageType) {
            case MessageType.HUB_PROPERTIES: {
                const property = data[3];
                switch (property) {
                    case HubPropertyReference.ADVERTISING_NAME:
                        const uint8Array = new Uint8Array(data.slice(5));
                        this._name = (new _TextDecoder()).decode(uint8Array);
                        break;
                    case HubPropertyReference.BATTERY_VOLTAGE:
                        this._batteryLevel = data[5];
                        break;
                    default:
                        break;
                }
                break;
            }

            case MessageType.HUB_ATTACHED_IO: {
                const portId = data[3];
                const event = data[4];
                const ioType = data[5];
                switch (event) {
                    case 0x00: // Detached I/O
                        this._dettachDevice(portId)
                        break;
                    case 0x01: // Attached I/O
                        this._attachDevice(portId, ioType);
                        break;
                    case 0x02: // Attached Virtual I/O
                    default:
                        break;
                }
                break;
            }

            case MessageType.PORT_VALUE: {
                const portId = data[3];
                const device = this._devices[portId];
                if (device) {
                    device.updateInputValues(data.slice(4));
                }
                break;
            }

            case MessageType.PORT_OUTPUT_COMMAND_FEEDBACK: {
                const portId = data[3];
                const feedback = data[4];

                const discarded = feedback & 0x04;
                const completed = feedback & 0x02;
                const inProgress = feedback & 0x01;

                if (discarded) {
                    this._clearOutputCommandCompletionCallback(portId);
                }
                if (completed) {
                    this._clearOutputCommandFeedbackCallback(portId);
                    this._clearOutputCommandCompletionCallback(portId);
                }
                if (inProgress) {
                    this._moveOutputCommandFeedbackCallbackToCompletionCallback(portId);
                }

                break;
            }

            default:
                break;
        }
    }

    _dettachDevice(portId) {
        this._devices[portId] = null;
    }

    _attachDevice(portId, ioType) {
        const device = Device.createDevice(ioType);
        this._devices[portId] = device;

        const mode = device.mode;
        if (mode !== null) {
            this.sendMessage(MessageType.PORT_INPUT_FORMAT_SETUP, [portId, mode, 1, 0, 0, 0, 1]);
        }
    }

    send(data, useLimiter = true, withResponse = null) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }

        if (useLimiter) {
            if (!this._rateLimiter.okayToSend()) {
                return Promise.resolve();
            }
        }

        this.logBytes(data, '>>');

        return this._ble.write(
            ServiceUUID,
            CharacteristicUUID,
            Base64Util.uint8ArrayToBase64(data),
            'base64',
            withResponse
        );
    }

    sendMessage(messageType, payload, useLimiter = true, withResponse = null) {
        const command = [
            0x00, // Hub ID: Always set to 0x00 (zero)
            messageType,
            ...payload
        ];
        command.unshift(command.length + 1);

        return this.send(command, useLimiter, withResponse);
    }

    sendOutputCommand(portId, subCommand, payload, needsFeedback = true, useLimiter = true) {
        const flag = needsFeedback ? 0x11 : 0x10;
        return this.sendMessage(MessageType.PORT_OUTPUT_COMMAND, [portId, flag, subCommand, ...payload], useLimiter);
    }

    // Reset and Stop

    reset() {
        this._name = null;
        this._batteryLevel = 0;
        this._devices = [];

        this._outputCommandFeedbackCallback = [];
        this._outputCommandCompletionCallback = [];

        this._stopPollingBatteryLevel();
    }

    stopAll() {
        if (this.isConnected()) {
            this.stopAllMotors();
        }
    }

    stopAllMotors() {
        for (const [portId, device] of Object.entries(this._devices)) {
            if (device instanceof Device.Motor) {
                this.sendOutputCommand(portId, 0x51, [0x00, 0], false, false);
                this._outputCommandFeedbackCallback[portId] = null;
                this._outputCommandCompletionCallback[portId] = null;
            }
        }
    }

    _startPollingBatteryLevel() {
        this._pollingId = window.setInterval(() => {
            this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.REQUEST_UPDATE]);
        }, PollingInterval);
    }

    _stopPollingBatteryLevel() {
        if (this._pollingId) {
            window.clearInterval(this._pollingId);
            this._pollingId = null;
        }
    }

    // Output Command Feedback

    _createOutputCommandFeedbackPromise(portId) {
        return new Promise(resolve => {
            this._outputCommandFeedbackCallback[portId] = resolve;
        });
    }

    _clearOutputCommandFeedbackCallback(portId) {
        if (this._outputCommandFeedbackCallback[portId]) {
            this._outputCommandFeedbackCallback[portId]();
            this._outputCommandFeedbackCallback[portId] = null;
        }
    }

    _clearOutputCommandCompletionCallback(portId) {
        if (this._outputCommandCompletionCallback[portId]) {
            this._outputCommandCompletionCallback[portId]();
            this._outputCommandCompletionCallback[portId] = null;
        }
    }

    _moveOutputCommandFeedbackCallbackToCompletionCallback(portId) {
        this._outputCommandCompletionCallback[portId] = this._outputCommandFeedbackCallback[portId];
        this._outputCommandFeedbackCallback[portId] = null;
    }

    // Motor

    getMotor(portId) {
        const device = this._devices[portId];
        if (device instanceof Device.Motor) {
            return device;
        } else {
            return null;
        }
    }

    motorPWM(portId, power) {
        power = MathUtil.clamp(power, -100, 100);

        const motor = this.getMotor(portId);
        if (motor) {
            return this.sendOutputCommand(portId, 0x51, [0x00, power]);
        } else {
            return Promise.resolve();
        }
    }

    motorRunForDegrees(portId, direction, degrees) {
        direction = direction * Math.sign(degrees);
        degrees = MathUtil.clamp(Math.abs(degrees), 1, 360000);

        const motor = this.getMotor(portId);
        if (motor && motor.canUseSpeed) {
            let speed = motor.speed * direction;
            return this.sendOutputCommand(portId, 0x0b, [...numberToInt32Array(degrees), speed, 100, 0x7f, 0x00])
                .then(this._createOutputCommandFeedbackPromise.bind(this, portId));
        } else {
            return Promise.resolve();
        }
    }

    motorRunTimed(portId, direction, seconds) {
        const milliseconds = MathUtil.clamp(seconds * 1000, 0, 15000);

        const motor = this.getMotor(portId);
        if (motor && motor.canUseSpeed) {
            let speed = motor.speed * direction;
            return this.sendOutputCommand(portId, 0x09, [...numberToInt16Array(milliseconds), speed, 100, 0x7f, 0x00])
                .then(this._createOutputCommandFeedbackPromise.bind(this, portId));
        } else {
            return Promise.resolve();
        }
    }

    motorStart(portId, direction) {
        const motor = this.getMotor(portId);
        if (motor && motor.canUseSpeed) {
            let speed = motor.speed * direction;
            return this.sendOutputCommand(portId, 0x07, [speed, 100, 0x00]);
        } else {
            return Promise.resolve();
        }
    }

    motorSetSpeed(portId, speed) {
        const motor = this.getMotor(portId);
        if (motor && motor.canUseSpeed) {
            motor.speed = speed;
        }
    }

    // Input Values

    inputValue(portId, key) {
        const device = this._devices[portId];
        if (device && device.inputValues.hasOwnProperty(key)) {
            return device.inputValues[key];
        }
        return null;
    }

    // Hub LED

    setLEDColor(color) {
        if (color < 0 || color > 10) {
            color = 0;
        }

        const portId = this._devices.findIndex(device => device && device.ioType == IOType.RGB_LIGHT);
        if (portId != -1) {
            return this.sendOutputCommand(portId, 0x51, [0x00, color]);
        } else {
            return Promise.resolve();
        }
    }

    // Util

    logBytes(byteArray, prefix) {
        bytes = byteArray.reduce((output, elem) =>
            (output + ('0' + (elem & 0xff).toString(16)).slice(-2)) + ' ', '');
        log.info(`${prefix} ${bytes}`);
    }
}

module.exports = Hub;
