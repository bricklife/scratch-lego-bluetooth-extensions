const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

const Hub = require('../scratch3_legoble/hub');
const setupTranslations = require('../scratch3_legoble/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAABYlAAAWJQFJUiTwAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAB0UlEQVR4Ae3Yv03DQBiHYRuFjoYFWIEW0cIMFFAhShYIEkiRQCILUCIqKNiBFtGyAgswAEgmjrjIRez3ztYVsd40vvh3//zki05yUfhRQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUUEABBRRQQIG8AmXK9LP5695v9fNYFuVBVVQfk3L7YjY9+Rrr/RibrZhOoU+Nt2gfL/B26uv/92Ks98Nzd12xAq/vn6uuCcae3V2ddRolVeDYsfo83yR20O30NLZrUr+b+cuyf675kzbT6Bz21bi1thkNWI+OmTRApPRdu7MNuelfeOAPlVSBYa3D/d3QXF3fP79X7WYjpW9z3Ka0O0+Y+iE8hT2FsxZz9F/48vwoy0Yent6W8+aav++mw75ovIcICUEuIABRLCAJQS4gAFEsIAlBLiAAUSwgCUEuIABRLCAJQS4gAFEsIAlBLiAAUSwgCUEuIABRLCAJQR79PjD2/Ris1xrnnr914YGBFTgQMLoCc70xDpWXa/6+PmFfNN4KJCHIBQQgigUkIcgFBCCKBSQhyKNP4dhTCdZrjXPP37rwwMAKHAjocAUUUEABBRRQQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUyC3wB8F0/UisWMI9AAAAAElFTkSuQmCC';

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

const externalPorts = ['A', 'B'];
const multipleExternalPorts = ['A', 'B', 'A+B'];

const Color = {
    BLACK: 0,
    PINK: 1,
    PURPLE: 2,
    BLUE: 3,
    LIGHT_BLUE: 4,
    LIGHT_GREEN: 5,
    GREEN: 6,
    YELLOW: 7,
    ORANGE: 8,
    RED: 9,
    WHITE: 10,
    NONE: -1,
};

class Scratch3PoweredUpBlocks {

    static get EXTENSION_ID() {
        return 'poweredup';
    }

    constructor(runtime) {
        this.runtime = runtime;

        this._peripheral = new Hub(this.runtime, Scratch3PoweredUpBlocks.EXTENSION_ID);
    }

    getInfo() {
        setupTranslations();

        return {
            id: Scratch3PoweredUpBlocks.EXTENSION_ID,
            name: 'Powered Up',
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
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
                            defaultValue: 3
                        }
                    }
                },
                {
                    opcode: 'getName',
                    text: formatMessage({
                        id: 'legobluetooth.getName',
                        default: 'name'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getBatteryLevel',
                    text: formatMessage({
                        id: 'legobluetooth.getBatteryLevel',
                        default: 'battery level'
                    }),
                    blockType: BlockType.REPORTER
                },
            ],
            menus: {
                PORT: {
                    acceptReporters: true,
                    items: externalPorts
                },
                MULTIPLE_PORT: {
                    acceptReporters: true,
                    items: multipleExternalPorts
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
                            value: 1
                        },
                        {
                            text: '⬇',
                            value: -1
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
                            value: Color.BLACK
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.pink',
                                default: '(1) Pink'
                            }),
                            value: Color.PINK
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.purple',
                                default: '(2) Purple'
                            }),
                            value: Color.PURPLE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.blue',
                                default: '(3) Blue'
                            }),
                            value: Color.BLUE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.lightBlue',
                                default: '(4) Light blue'
                            }),
                            value: Color.LIGHT_BLUE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.lightGreen',
                                default: '(5) Light green'
                            }),
                            value: Color.LIGHT_GREEN
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.green',
                                default: '(6) Green'
                            }),
                            value: Color.GREEN
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.yellow',
                                default: '(7) Yellow'
                            }),
                            value: Color.YELLOW
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.orange',
                                default: '(8) Orange'
                            }),
                            value: Color.ORANGE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.red',
                                default: '(9) Red'
                            }),
                            value: Color.RED
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.white',
                                default: '(10) White'
                            }),
                            value: Color.WHITE
                        },
                    ]
                },
                XY: {
                    acceptReporters: false,
                    items: ['x', 'y']
                },
            }
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
            const portId = externalPorts.indexOf(port);
            return this._peripheral.motorPWM(portId, power);
        });

        return Promise.all(promises).then(waitPromise);
    }

    motorStop(args) {
        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = externalPorts.indexOf(port);
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
            const portId = externalPorts.indexOf(port);
            return this._peripheral.motorRunForDegrees(portId, direction, degrees);
        });

        return Promise.all(promises).then(() => { });
    }

    _motorRunTimed(ports, direction, seconds) {
        const promises = ports.map(port => {
            const portId = externalPorts.indexOf(port);
            return this._peripheral.motorRunTimed(portId, direction, seconds);
        });

        return Promise.all(promises).then(() => { });
    }

    motorStart(args) {
        const direction = args.DIRECTION;

        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = externalPorts.indexOf(port);
            return this._peripheral.motorStart(portId, direction);
        });

        return Promise.all(promises).then(waitPromise);
    }

    motorSetSpeed(args) {
        const speed = Cast.toNumber(args.SPEED);

        const ports = this._validatePorts(Cast.toString(args.PORT));

        ports.forEach(port => {
            const portId = externalPorts.indexOf(port);
            this._peripheral.motorSetSpeed(portId, speed);
        });

        return Promise.resolve();
    }

    motorResetRelativePosition(args) {
        const relativePosition = Cast.toNumber(args.RELATIVE_POSITION);

        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = externalPorts.indexOf(port);
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
            const portId = externalPorts.indexOf(port);
            const value = this._peripheral.inputValue(portId, key);
            return value != null ? value : defaultValue;
        }
        return defaultValue;
    }

    setHubLEDColor(args) {
        const color = Cast.toNumber(args.COLOR);
        return this._peripheral.setLEDColor(color).then(waitPromise);
    }

    getName() {
        return this._peripheral.name ? this._peripheral.name : "";
    }

    getBatteryLevel() {
        return this._peripheral.batteryLevel;
    }
}

module.exports = Scratch3PoweredUpBlocks;
