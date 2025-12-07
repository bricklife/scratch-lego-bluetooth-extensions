const ArgumentType = require('../../../extension-support/argument-type');
const BlockType = require('../../../extension-support/block-type');
const Cast = require('../../../util/cast');
const UtilColor = require('../../../util/color');

const Color = require('./color');

const setupTranslations = require('./setup-translations');

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

class BleBaseBlocks {

    constructor(peripheral) {
        this._peripheral = peripheral;
    }

    get externalPorts() {
        return ['A', 'B', 'C', 'D'];
    }

    get multipleExternalPorts() {
        return ['A', 'B', 'C', 'D', 'A+B', 'C+D', 'A+B+C+D'];
    }

    get hasInternalTiltSensorBlocks() {
        return true;
    }

    get hasAdvancedBlocks() {
        return false;
    }

    getBlocks(formatMessage) {
        var blocks = [
            {
                opcode: 'motorPWM',
                text: formatMessage({
                    id: 'legobluetooth.motorPWM',
                    default: '[PORT] start motor at [POWER] % power'
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'MULTIPLE_PORT',
                        defaultValue: 'A'
                    },
                    POWER: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 100
                    }
                }
            },
            {
                opcode: 'motorStop',
                text: formatMessage({
                    id: 'legobluetooth.motorStop',
                    default: '[PORT] stop motor'
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'MULTIPLE_PORT',
                        defaultValue: 'A'
                    }
                }
            },
            '---',
            {
                opcode: 'motorRunFor',
                text: formatMessage({
                    id: 'legobluetooth.motorRunFor',
                    default: '[PORT] run [DIRECTION] for [VALUE] [UNIT]'
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'MULTIPLE_PORT',
                        defaultValue: 'A'
                    },
                    DIRECTION: {
                        type: ArgumentType.NUMBER,
                        menu: 'DIRECTION',
                        defaultValue: 1
                    },
                    VALUE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1
                    },
                    UNIT: {
                        type: ArgumentType.STRING,
                        menu: 'MOTOR_UNIT',
                        defaultValue: 'rotations'
                    }
                }
            },
            {
                opcode: 'motorStart',
                text: formatMessage({
                    id: 'legobluetooth.motorStart',
                    default: '[PORT] start motor [DIRECTION]'
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'MULTIPLE_PORT',
                        defaultValue: 'A'
                    },
                    DIRECTION: {
                        type: ArgumentType.NUMBER,
                        menu: 'DIRECTION',
                        defaultValue: 1
                    }
                }
            },
            {
                opcode: 'motorSetSpeed',
                text: formatMessage({
                    id: 'legobluetooth.motorSetSpeed',
                    default: '[PORT] set speed to [SPEED] %'
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'MULTIPLE_PORT',
                        defaultValue: 'A'
                    },
                    SPEED: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 75
                    }
                }
            },
            {
                opcode: 'getRelativePosition',
                text: formatMessage({
                    id: 'legobluetooth.getRelativePosition',
                    default: '[PORT] relative position'
                }),
                blockType: BlockType.REPORTER,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'PORT',
                        defaultValue: 'A'
                    }
                }
            },
            {
                opcode: 'motorResetRelativePosition',
                text: formatMessage({
                    id: 'legobluetooth.motorResetRelativePosition',
                    default: '[PORT] reset relative position to [RELATIVE_POSITION]'
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'MULTIPLE_PORT',
                        defaultValue: 'A'
                    },
                    RELATIVE_POSITION: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 0
                    }
                }
            },
            '---',
            {
                opcode: 'getColor',
                text: formatMessage({
                    id: 'legobluetooth.getColor',
                    default: '[PORT] color'
                }),
                blockType: BlockType.REPORTER,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'PORT',
                        defaultValue: 'A'
                    }
                }
            },
            {
                opcode: 'getDistance',
                text: formatMessage({
                    id: 'legobluetooth.getDistance',
                    default: '[PORT] distance'
                }),
                blockType: BlockType.REPORTER,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'PORT',
                        defaultValue: 'A'
                    }
                }
            },
            {
                opcode: 'getForce',
                text: formatMessage({
                    id: 'legobluetooth.getForce',
                    default: '[PORT] force'
                }),
                blockType: BlockType.REPORTER,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'PORT',
                        defaultValue: 'A'
                    }
                }
            },
            {
                opcode: 'getTilt',
                text: formatMessage({
                    id: 'legobluetooth.getTilt',
                    default: '[PORT] tilt [XY]'
                }),
                blockType: BlockType.REPORTER,
                arguments: {
                    PORT: {
                        type: ArgumentType.STRING,
                        menu: 'PORT',
                        defaultValue: 'A'
                    },
                    XY: {
                        type: ArgumentType.STRING,
                        menu: 'XY',
                        defaultValue: 'x'
                    }
                }
            },
            '---',
            {
                opcode: 'setHubLEDColor',
                text: formatMessage({
                    id: 'legobluetooth.setHubLEDColor',
                    default: 'set hub LED color to [COLOR]',
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    COLOR: {
                        type: ArgumentType.NUMBER,
                        menu: 'LED_COLOR',
                        defaultValue: Color.BLUE
                    }
                }
            },
            {
                opcode: 'setHubLEDColorRGB',
                text: formatMessage({
                    id: 'legobluetooth.setHubLEDColorRGB',
                    default: 'set hub LED color to R[RED] G[GREEN] B[BLUE]',
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    RED: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 255
                    },
                    GREEN: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 255
                    },
                    BLUE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 255
                    }
                }
            },
            {
                opcode: 'setHubLEDColorHSV',
                text: formatMessage({
                    id: 'legobluetooth.setHubLEDColorHSV',
                    default: 'set hub LED color to H[HUE] S[SATURATION] V[VALUE]',
                }),
                blockType: BlockType.COMMAND,
                arguments: {
                    HUE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 360
                    },
                    SATURATION: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 100
                    },
                    VALUE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 100
                    }
                }
            }
        ];

        if (this.hasInternalTiltSensorBlocks) {
            blocks.push(
                {
                    opcode: 'getHubTilt',
                    text: formatMessage({
                        id: 'legobluetooth.getHubTilt',
                        default: 'hub tilt [XYZ]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        XYZ: {
                            type: ArgumentType.STRING,
                            menu: 'XYZ',
                            defaultValue: 'x'
                        }
                    }
                }
            );
        }

        if (this.hasAdvancedBlocks) {
            blocks.push(
                {
                    opcode: 'getName',
                    text: formatMessage({
                        id: 'legobluetooth.getName',
                        default: 'name'
                    }),
                    blockType: BlockType.REPORTER
                }
            );
            blocks.push(
                {
                    opcode: 'getFirmwareVersion',
                    text: formatMessage({
                        id: 'legobluetooth.getFirmwareVersion',
                        default: 'firmware version'
                    }),
                    blockType: BlockType.REPORTER
                }
            );
            blocks.push(
                {
                    opcode: 'getBatteryLevel',
                    text: formatMessage({
                        id: 'legobluetooth.getBatteryLevel',
                        default: 'battery level'
                    }),
                    blockType: BlockType.REPORTER
                }
            );
        }

        return blocks;
    }

    getMenus(formatMessage) {
        return {
            PORT: {
                acceptReporters: true,
                items: this.externalPorts
            },
            MULTIPLE_PORT: {
                acceptReporters: true,
                items: this.multipleExternalPorts
            },
            MOTOR_UNIT: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'legobluetooth.rotations',
                            default: 'rotations'
                        }),
                        value: 'rotations'
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.degrees',
                            default: 'degrees'
                        }),
                        value: 'degrees'
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.seconds',
                            default: 'seconds'
                        }),
                        value: 'seconds'
                    }
                ]
            },
            DIRECTION: {
                acceptReporters: false,
                items: [
                    {
                        text: '⬆︎',
                        value: '1'
                    },
                    {
                        text: '⬇',
                        value: '-1'
                    }
                ]
            },
            LED_COLOR: {
                acceptReporters: true,
                items: [
                    {
                        text: formatMessage({
                            id: 'legobluetooth.black',
                            default: '(0) Black'
                        }),
                        value: String(Color.BLACK)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.pink',
                            default: '(1) Pink'
                        }),
                        value: String(Color.PINK)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.purple',
                            default: '(2) Purple'
                        }),
                        value: String(Color.PURPLE)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.blue',
                            default: '(3) Blue'
                        }),
                        value: String(Color.BLUE)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.lightBlue',
                            default: '(4) Light blue'
                        }),
                        value: String(Color.LIGHT_BLUE)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.lightGreen',
                            default: '(5) Light green'
                        }),
                        value: String(Color.LIGHT_GREEN)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.green',
                            default: '(6) Green'
                        }),
                        value: String(Color.GREEN)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.yellow',
                            default: '(7) Yellow'
                        }),
                        value: String(Color.YELLOW)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.orange',
                            default: '(8) Orange'
                        }),
                        value: String(Color.ORANGE)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.red',
                            default: '(9) Red'
                        }),
                        value: String(Color.RED)
                    },
                    {
                        text: formatMessage({
                            id: 'legobluetooth.white',
                            default: '(10) White'
                        }),
                        value: String(Color.WHITE)
                    },
                ]
            },
            XY: {
                acceptReporters: false,
                items: ['x', 'y']
            },
            XYZ: {
                acceptReporters: false,
                items: ['x', 'y', 'z']
            },
        };
    }

    _validatePorts(text) {
        return text.toUpperCase().replace(/[^ABCD]/g, '')
            .split('')
            .filter((x, i, self) => self.indexOf(x) === i)
            .sort();
    }

    motorPWM(args) {
        const power = Cast.toNumber(args.POWER);

        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            return this._peripheral.motorPWM(portId, power);
        });

        return Promise.all(promises).then(waitPromise);
    }

    motorStop(args) {
        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            return this._peripheral.motorPWM(portId, 0);
        });

        return Promise.all(promises).then(waitPromise);
    }

    motorRunFor(args) {
        const direction = args.DIRECTION;
        const value = Cast.toNumber(args.VALUE);
        const unit = args.UNIT;

        const ports = this._validatePorts(Cast.toString(args.PORT));

        switch (unit) {
            case 'rotations':
                return this._motorRunForDegrees(ports, direction, value * 360);
                break;
            case 'degrees':
                return this._motorRunForDegrees(ports, direction, value);
                break;
            case 'seconds':
                return this._motorRunTimed(ports, direction, value);
                break;
            default:
                return Promise.resolve();
        }
    }

    _motorRunForDegrees(ports, direction, degrees) {
        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            return this._peripheral.motorRunForDegrees(portId, direction, degrees);
        });

        return Promise.all(promises).then(() => { });
    }

    _motorRunTimed(ports, direction, seconds) {
        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            return this._peripheral.motorRunTimed(portId, direction, seconds);
        });

        return Promise.all(promises).then(() => { });
    }

    motorStart(args) {
        const direction = args.DIRECTION;

        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            return this._peripheral.motorStart(portId, direction);
        });

        return Promise.all(promises).then(waitPromise);
    }

    motorSetSpeed(args) {
        const speed = Cast.toNumber(args.SPEED);

        const ports = this._validatePorts(Cast.toString(args.PORT));

        ports.forEach(port => {
            const portId = this.externalPorts.indexOf(port);
            this._peripheral.motorSetSpeed(portId, speed);
        });

        return Promise.resolve();
    }

    motorResetRelativePosition(args) {
        const relativePosition = Cast.toNumber(args.RELATIVE_POSITION);

        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            return this._peripheral.motorResetRelativePosition(portId, relativePosition);
        });

        return Promise.all(promises).then(waitPromise);
    }

    getRelativePosition(args) {
        return this._getSensorValue(args, 'relativePosition', 0);
    }

    getColor(args) {
        return this._getSensorValue(args, 'color', -1);
    }

    getDistance(args) {
        return this._getSensorValue(args, 'distance', 0);
    }

    getForce(args) {
        return this._getSensorValue(args, 'force', 0);
    }

    getTilt(args) {
        const key = 'tilt' + args.XY.toUpperCase();
        return this._getSensorValue(args, key, 0);
    }

    _getSensorValue(args, key, defaultValue) {
        const port = this._validatePorts(Cast.toString(args.PORT)).shift();
        if (port) {
            const portId = this.externalPorts.indexOf(port);
            const value = this._peripheral.inputValue(portId, key);
            return value != null ? value : defaultValue;
        }
        return defaultValue;
    }

    setHubLEDColor(args) {
        const color = Cast.toNumber(args.COLOR);
        return this._peripheral.setLEDColor(color).then(waitPromise);
    }

    setHubLEDColorRGB(args) {
        const red = Cast.toNumber(args.RED);
        const green = Cast.toNumber(args.GREEN);
        const blue = Cast.toNumber(args.BLUE);
        return this._peripheral.setLEDColorRGB(red, green, blue).then(waitPromise);
    }

    setHubLEDColorHSV(args) {
        const rgb = UtilColor.hsvToRgb({
            h: Cast.toNumber(args.HUE),
            s: Cast.toNumber(args.SATURATION) / 100,
            v: Cast.toNumber(args.VALUE) / 100
        });
        return this._peripheral.setLEDColorRGB(rgb.r, rgb.g, rgb.b).then(waitPromise);
    }

    getHubTilt(args) {
        const key = 'tilt' + args.XYZ.toUpperCase();
        const value = this._peripheral.internalInputValue(key);
        return value != null ? value : 0;
    }

    getName() {
        return this._peripheral.name ? this._peripheral.name : "";
    }

    getFirmwareVersion() {
        return this._peripheral.firmwareVersion ? this._peripheral.firmwareVersion : "";
    }

    getBatteryLevel() {
        return this._peripheral.batteryLevel;
    }

    setupTranslations(formatMessage) {
        setupTranslations(formatMessage);
    }
}

module.exports = BleBaseBlocks;
