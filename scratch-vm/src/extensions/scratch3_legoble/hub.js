const BLE = require('../../io/ble');
const Base64Util = require('../../util/base64-util');
const MathUtil = require('../../util/math-util');
const RateLimiter = require('../../util/rateLimiter.js');
const log = require('../../util/log');

const ServiceUUID = '00001623-1212-efde-1623-785feabcd123';
const CharacteristicUUID = '00001624-1212-efde-1623-785feabcd123';
const SendRateMax = 20;

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

class Hub {

    constructor(runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;

        this._batteryLevel = 0;
        this._ports = [];

        this._ble = null;
        this._runtime.registerPeripheralExtension(extensionId, this);
        this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

        this._rateLimiter = new RateLimiter(SendRateMax);

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
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

        // Send a request for battery level
        setTimeout(() => {
            this.sendMessage(
                MessageType.HUB_PROPERTIES,
                [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.ENABLE_UPDATES],
                false
            );
        }, 500);
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
                const typeId = data[5];
                switch (event) {
                    case 0x00: // Detached I/O
                        this._ports[portId] = null;
                        break;
                    case 0x01: // Attached I/O
                        this._ports[portId] = typeId;
                        break;
                    case 0x02: // Attached Virtual I/O
                    default:
                        break;
                }
                break;
            }

            default:
                break;
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

    // Reset and Stop

    reset() {
        this._batteryLevel = 0;
        this._ports = [];
    }

    stopAll() {
        if (this.isConnected()) {
            this.stopAllMotors();
        }
    }

    stopAllMotors() {
    }

    // Util

    logBytes(byteArray, prefix) {
        bytes = byteArray.reduce((output, elem) =>
            (output + ('0' + (elem & 0xff).toString(16)).slice(-2)) + ' ', '');
        log.info(`${prefix} ${bytes}`);
    }
}

module.exports = Hub;
