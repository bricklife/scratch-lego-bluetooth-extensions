const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const Hub = require('./hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAABYlAAAWJQFJUiTwAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAB0UlEQVR4Ae3Yv03DQBiHYRuFjoYFWIEW0cIMFFAhShYIEkiRQCILUCIqKNiBFtGyAgswAEgmjrjIRez3ztYVsd40vvh3//zki05yUfhRQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUUEABBRRQQIG8AmXK9LP5695v9fNYFuVBVVQfk3L7YjY9+Rrr/RibrZhOoU+Nt2gfL/B26uv/92Ks98Nzd12xAq/vn6uuCcae3V2ddRolVeDYsfo83yR20O30NLZrUr+b+cuyf675kzbT6Bz21bi1thkNWI+OmTRApPRdu7MNuelfeOAPlVSBYa3D/d3QXF3fP79X7WYjpW9z3Ka0O0+Y+iE8hT2FsxZz9F/48vwoy0Yent6W8+aav++mw75ovIcICUEuIABRLCAJQS4gAFEsIAlBLiAAUSwgCUEuIABRLCAJQS4gAFEsIAlBLiAAUSwgCUEuIABRLCAJQR79PjD2/Ris1xrnnr914YGBFTgQMLoCc70xDpWXa/6+PmFfNN4KJCHIBQQgigUkIcgFBCCKBSQhyKNP4dhTCdZrjXPP37rwwMAKHAjocAUUUEABBRRQQAEFFFBAAQUUUEABBRRQQAEFFFBAAQUUyC3wB8F0/UisWMI9AAAAAElFTkSuQmCC';

const externalPorts = ['A', 'B', 'C', 'D'];
const multipleExternalPorts = ['A', 'B', 'C', 'D', 'A+B', 'C+D', 'A+B+C+D'];

class Scratch3LegoBleBlocks {

    static get EXTENSION_ID() {
        return 'legoble';
    }

    constructor(runtime) {
        this.runtime = runtime;

        this._peripheral = new Hub(this.runtime, Scratch3LegoBleBlocks.EXTENSION_ID);
    }

    getInfo() {
        this.setupTranslations();

        return {
            id: Scratch3LegoBleBlocks.EXTENSION_ID,
            name: 'LEGO BLE',
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
                }
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
                            text: formatMessage({
                                id: 'legobluetooth.clockwise',
                                default: 'clockwise'
                            }),
                            value: 1
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.counterclockwise',
                                default: 'counterclockwise'
                            }),
                            value: -1
                        }
                    ]
                }
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

        console.log(`motorPWM: ${ports}, ${power}`);
        return Promise.resolve();
    }

    motorStop(args) {
        const ports = this._validatePorts(Cast.toString(args.PORT));

        console.log(`motorStop: ${ports}`);
        return Promise.resolve();
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
        console.log(`_motorRunForDegrees: ${ports}, ${direction}, ${degrees}`);
        return Promise.resolve();
    }

    _motorRunTimed(ports, direction, seconds) {
        console.log(`_motorRunTimed: ${ports}, ${direction}, ${seconds}`);
        return Promise.resolve();
    }

    motorStart(args) {
        const direction = args.DIRECTION;

        const ports = this._validatePorts(Cast.toString(args.PORT));

        console.log(`motorStart: ${ports}, ${direction}`);
        return Promise.resolve();
    }

    motorSetSpeed(args) {
        const speed = Cast.toNumber(args.SPEED);

        const ports = this._validatePorts(Cast.toString(args.PORT));

        console.log(`motorSetSpeed: ${ports}, ${speed}`);
        return Promise.resolve();
    }

    setupTranslations() {
        const localeSetup = formatMessage.setup();
        const extTranslations = {
            'ja': {
                'legobluetooth.motorPWM': '[PORT] モーターを [POWER] % のパワーで回す',
                'legobluetooth.motorStop': '[PORT] モーターを止める',
                'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] に [VALUE] [UNIT] 回す',
                'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] に回す',
                'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] % にする',

                'legobluetooth.clockwise': '時計回り',
                'legobluetooth.counterclockwise': '反時計回り',
                'legobluetooth.rotations': '回転',
                'legobluetooth.degrees': '度',
                'legobluetooth.seconds': '秒'
            },
            'ja-Hira': {
                'legobluetooth.motorPWM': '[PORT] モーターを [POWER] % のパワーでまわす',
                'legobluetooth.motorStop': '[PORT] モーターをとめる',
                'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] に [VALUE] [UNIT] まわす',
                'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] にまわす',
                'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] % にする',

                'legobluetooth.clockwise': 'とけいまわり',
                'legobluetooth.counterclockwise': 'はんとけいまわり',
                'legobluetooth.rotations': 'かいてん',
                'legobluetooth.degrees': 'ど',
                'legobluetooth.seconds': 'びょう'
            }
        };

        for (const locale in extTranslations) {
            if (!localeSetup.translations[locale]) {
                localeSetup.translations[locale] = {};
            }
            Object.assign(localeSetup.translations[locale], extTranslations[locale]);
        }
    }
}

module.exports = Scratch3LegoBleBlocks;
