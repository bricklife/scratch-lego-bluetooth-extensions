const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

const Hub = require('../scratch3_legoble/hub');
const setupTranslations = require('../scratch3_legoble/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAEJ0lEQVR4Ae2aT0gUURzHf7O7luFWZNTB7A8eggySKIQOKXhIVgy6JFHXCLp08FJCgWBQHeoahNc82CUoXPQQ5KVLEQkWdJBKMyi0P/4rXZ3eb8dX4zBv3m/2zbqO/gaWt/Pe78/7ffb73pvVBeCLCTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJxIaAFWamz5+A7WffeBrycXTjfr5x70vEvYBSz1+rQJWqVmviUt2rlS9sHlZgWGIe+5TnXnnbcEI5VJSBwRdFCRt5UFagIVKyAuOiCB2Pvgr/J4mWGedJQufvHWcFeomEvNeewjKe/OQyZM1Kz3BtNufYexXRvw0yS4vwQDyIVvtFFIWMJZJwqfkXZP3GsxXwUvge8xuTfSLGq8wMHJf3lDY2CgyCh4UiWLRRFp0IGJNOFBtpu9wWWU+ebAa3UnmqFYDKlTZ+acrLoef3HNy1bUg3JAEqltfejHAaXASwLJhGG5jy81b3RQJQLjt1Gv8RFQy0lluG11OXS+U3N/s/EgLzXshz/g+cFI3vFuC1l/exWcJywsVql4QyA7cAReJIFChjezd+2e9tVSpx2wWp020X1XvdFqDKwwpUkSH2M0AiKJUZA1SRIfYzQCIolRkDVJEh9jNAIiiVGQNUkSH2M0AiKJUZA1SRIfZH+k2E8g2DOK/YmLECDT+qSBS42t9bDWuO1J0VaIgzEgUazsHXXfd3P1+nCDrlPk79yxIr0BD6mlNgqffTsMpnBRoqkAEyQEMChu6sQAZoSMDQffnfy+oo1289FP963rjXzY4LgYx4CRtqg/wcmH10xzBVvNwzZ6+SJqxVoAXWNEZKpspIAdeDkaxV1h5UE0GB9icRoHbr9l3wY2I8KFasxp72DVDmm+7qCDbTKlD8bCmfqfrAkeBIG3SUoEDoFsfQlb01dYkvo+9g4uvHdYGqteWUbx07d++H+sZz+HvfJSEerWq0Cuy6dn7YtuA+ZqurbwVMsF4vrA1rxAtrxtp1tVIUCKmasvbcSO7Q5i3pJvx0RkfewNiHIZj6+Q0Wcwu6HGt6HA8M3N9xixKrzJmrZT1L1aTaKRMPfEh0B+js7d2UG1m4Z9lwWTxZa5Xr9o3Le1y2qDwUTGdb2zxl3mSAMtiN2z2HxfuLYNtiE7H22WCn5VgcW+dRRTxpOIdlN2XZuusMDdDtjO/zQG17CFV5pvko7Kmq9JqsuP88PgmP+1//26TDTnhFsDWQ33gpug+ZgcFhQECqC8fQBi/qJq2KJftLnZ90iMjJqlp5yMzOzTehumoPVuVflTuc1T35fRrevh/Pv/IxQmzSqpzu/lLmN17CshDKIVPIJi3j69pS5Y8MoCzQe8g4/YVv0jIutS11fuo82Y4JMAEmwASYABNgAkyACTABJsAEmAATYAJMoBACfwH6m0O5zpelggAAAABJRU5ErkJggg==';

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

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

const Sound = {
    BRAKE: 3,
    DEPARTURE: 5,
    REFILL: 7,
    HORN: 9,
    STEAM: 10,
};

const PortId = {
    MOTOR: 0x00,
    SPEAKER: 0x01,
    RGB_LIGHT: 0x11,
    COLOR_SENSOR: 0x12,
    SPEEDOMETER: 0x13,
};

class Scratch3DuploTrainBlocks {

    static get EXTENSION_ID() {
        return 'duplotrain';
    }

    constructor(runtime) {
        this.runtime = runtime;

        this._peripheral = new Hub(this.runtime, Scratch3DuploTrainBlocks.EXTENSION_ID, 0x20);
    }

    getInfo() {
        this._setupTranslations();

        return {
            id: Scratch3DuploTrainBlocks.EXTENSION_ID,
            name: 'Duplo Train',
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'motorPWM',
                    text: formatMessage({
                        id: 'duplotrain.motorPWM',
                        default: 'run [DIRECTION] at [POWER] % power'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.NUMBER,
                            menu: 'DIRECTION',
                            defaultValue: 1
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
                        id: 'duplotrain.motorStop',
                        default: 'stop'
                    }),
                    blockType: BlockType.COMMAND
                },
                '---',
                {
                    opcode: 'playSound',
                    text: formatMessage({
                        id: 'duplotrain.playSound',
                        default: 'play [SOUND] sound'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SOUND: {
                            type: ArgumentType.NUMBER,
                            menu: 'SOUND',
                            defaultValue: Sound.BRAKE
                        }
                    }
                },
                {
                    opcode: 'setHubLEDColor',
                    text: formatMessage({
                        id: 'duplotrain.setHubLEDColor',
                        default: 'set light color to [COLOR]'
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
                '---',
                {
                    opcode: 'whenColor',
                    text: formatMessage({
                        id: 'duplotrain.whenColor',
                        default: 'when ground color is [SENSOR_COLOR]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        SENSOR_COLOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'SENSOR_COLOR',
                            defaultValue: Color.BLUE
                        }
                    }
                },
                {
                    opcode: 'isColor',
                    text: formatMessage({
                        id: 'duplotrain.isColor',
                        default: 'ground color is [SENSOR_COLOR] ?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        SENSOR_COLOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'SENSOR_COLOR',
                            defaultValue: Color.BLUE
                        }
                    }
                },
                {
                    opcode: 'getColor',
                    text: formatMessage({
                        id: 'duplotrain.getColor',
                        default: 'ground color'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getDrivingDistance',
                    text: formatMessage({
                        id: 'duplotrain.getDrivingDistance',
                        default: 'driving distance'
                    }),
                    blockType: BlockType.REPORTER
                },
            ],
            menus: {
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
                SOUND: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'duplotrain.brake',
                                default: 'brake'
                            }),
                            value: Sound.BRAKE
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.departure',
                                default: 'departure'
                            }),
                            value: Sound.DEPARTURE
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.refill',
                                default: 'refill'
                            }),
                            value: Sound.REFILL
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.horn',
                                default: 'horn'
                            }),
                            value: Sound.HORN
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.steam',
                                default: 'steam'
                            }),
                            value: Sound.STEAM
                        },
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
                SENSOR_COLOR: {
                    acceptReporters: false,
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
                                id: 'legobluetooth.blue',
                                default: '(3) Blue'
                            }),
                            value: Color.BLUE
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
                                id: 'legobluetooth.yellow',
                                default: '(7) Yellow'
                            }),
                            value: Color.YELLOW
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
                        {
                            text: formatMessage({
                                id: 'legobluetooth.noColor',
                                default: '(-1) No color'
                            }),
                            value: Color.NONE
                        },
                    ]
                },
            }
        };
    }

    motorPWM(args) {
        const power = Cast.toNumber(args.POWER);
        const direction = args.DIRECTION;

        return this._peripheral.motorPWM(PortId.MOTOR, power * direction).then(waitPromise);
    }

    motorStop() {
        return this._peripheral.motorPWM(PortId.MOTOR, 0).then(waitPromise);
    }

    playSound(args) {
        const sound = args.SOUND;
        return this._peripheral.sendOutputCommand(PortId.SPEAKER, 0x51, [0x01, sound]).then(waitPromise);
    }

    setHubLEDColor(args) {
        const color = Cast.toNumber(args.COLOR);
        return this._peripheral.setLEDColor(color).then(waitPromise);
    }

    whenColor(args) {
        return this.getColor() == args.SENSOR_COLOR;
    }

    isColor(args) {
        return this.getColor() == args.SENSOR_COLOR;
    }

    getColor() {
        return this._getSensorValue(PortId.COLOR_SENSOR, 'color', -1);
    }

    getDrivingDistance() {
        return this._getSensorValue(PortId.SPEEDOMETER, 'drivingDistance', 0);
    }

    _getSensorValue(portId, key, defaultValue) {
        const value = this._peripheral.inputValue(portId, key);
        return value != null ? value : defaultValue;
    }

    _setupTranslations() {
        setupTranslations({
            'ja': {
                'duplotrain.motorPWM': '[DIRECTION] 方向に [POWER] %のパワーで走る',
                'duplotrain.motorStop': '止まる',
                'duplotrain.playSound': '[SOUND] の音を鳴らす',
                'duplotrain.setHubLEDColor': 'ライトの色を [COLOR] にする',
                'duplotrain.whenColor': '地面の色が [SENSOR_COLOR] のとき',
                'duplotrain.isColor': '地面の色が [SENSOR_COLOR]',
                'duplotrain.getColor': '地面の色',
                'duplotrain.getDrivingDistance': '走行距離',

                'duplotrain.brake': 'ブレーキ',
                'duplotrain.departure': '到着',
                'duplotrain.refill': '給水',
                'duplotrain.horn': '汽笛',
                'duplotrain.steam': '蒸気',
            },
            'ja-Hira': {
                'duplotrain.motorPWM': '[DIRECTION] ほうこうに [POWER] %のパワーではしる',
                'duplotrain.motorStop': 'とまる',
                'duplotrain.playSound': '[SOUND] のおとをならす',
                'duplotrain.setHubLEDColor': 'ライトのいろを [COLOR] にする',
                'duplotrain.whenColor': 'じめんのいろが [SENSOR_COLOR] のとき',
                'duplotrain.isColor': 'じめんのいろが [SENSOR_COLOR]',
                'duplotrain.getColor': 'じめんのいろ',
                'duplotrain.getDrivingDistance': 'そうこうきょり',

                'duplotrain.brake': 'ブレーキ',
                'duplotrain.departure': 'とうちゃく',
                'duplotrain.refill': 'きゅうすい',
                'duplotrain.horn': 'きてき',
                'duplotrain.steam': 'じょうき',
            }
        });
    }
}

module.exports = Scratch3DuploTrainBlocks;
