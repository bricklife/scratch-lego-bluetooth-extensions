const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

const Hub = require('./lib/hub');
const Color = require('./lib/color');
const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAEMElEQVR4Ae2bT0hUQRzHf0/X1S0LErrYn4OHIoU6RhfDJYwV65ZUekuCsJMXFZQMjfRSlyIIu2WFEgSFixJGXjoGwQp18NAfL5FBba3a6mt+u46sw8x7M/seu+7z92CZN7/5zfze77PfmXlv/wDQQQSIABEgAkSACBABIkAEiAARIAJEgAgQASJQOAKWbqi3L8GW+Z4+B5kx3NplfYNgKwtCEsXMQalAlaIKfbFc4YWOqxuPFKhLSuEXUtg3zY2nNk8LejL3rqDh8g5GCswbXbajqwJLRQm6HKZ2y+8mWv5k7yZ0x+F+pEBOIs9SuQvz8fg7FnPVKu/hrYyns/1FRUzvhdj6GjxkN6MHZRFYIl/LyuHq2V8Ql7XHqyFh21Ava+M2y4L5WBIaeF2nLBkFOsHDRBEs+jgkPeHQxpt0fLhvpiyQrrbEzKvClaeaCahc7iMLwNommX0wzKQaLYfNBY/ZYXYNYJWdbPjIuittJaNAZQaaDS1JmMcpiqB+ILWNA8/Rhm3ow+26pec1kK9ZugG5n5OSuE8xSre1VLymHaNAMXFVnYnRbS3d0tW3NVDcNbdEyanwXT3HJD1VKVTq7KPRbS0VQ5ECRSKGdQJoCEx0J4AiEcM6ATQEJroTQJGIYZ0AGgIT3QmgSMSwTgANgYnuBFAkYlj37UlE9wnD8Pq2vTsp0ONb5FmBxXpm9Zi3b91JgR5Relagx/jK7vl+zqgc0LCBr+lunzKRAg3Biu7bToHbZU3VnQGkQFFShnUCaAhMdCeAIhHDOgE0BCa6E0CRiGFd+b1w/+3xnK+fDUcNoPtwX7uUFSnQ45vteh8Ynxz1GKK0u8cu9DgmQAp0xOPe6KpA9yFK2+PV1IxWAsN9cjdSoJyLtlWpQAuspA12dVWkGpZTSe0BS82xtaVZecmYe1NrF/stoaUE4KTABI5cs/+QMkDQG3Jyz7CQ5asEaFnWI+xw9HgTVISrZH0DbcOcMXc8OAtZwtKbQ3S0bdsaGH36mp1El1O/4eOHN7D0/UugpzPmjdMWlYfwqiJ7kN7sUM+lMwyi9MFCvQayDrfuPu9Iraw8ZgNFT5w8j+PvrIPBi1RWdqjgIQylAjkpVOKN0WedrLzCbA24sfC2IJYbG0YCp+3NnotjTvAwf1eAOpD6R8bvsZ+4d+2KhKG5sQEO1NZIu31bXIKZuQT8Ta1i5PvDve3XpY6GxmLGV05hkxxCdRXd6YX0MQYm+mL6PdQfqc28avZlxbr0k/38/dNi5pUZl02NUF2o2ySGk28x4/uiQExucGIinF74d4cttdfYaivd3VmwdduCB5jwYFsbk6F/R7Hi+waQoxgYeYJ/lepkuze7Q7UOZ+32Z7ab4TPT2FDvZeU9FR/DS1ns+F6unfoSASJABIgAESACRIAIEAEiQASIABEgAkSACLgR+A/LqB1v+aX9ZAAAAABJRU5ErkJggg==';

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/duplotrain.mjs';

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

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        this._peripheral = new Hub(runtime, Scratch3DuploTrainBlocks.EXTENSION_ID, 0x20);

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        this._setupTranslations();

        return {
            id: Scratch3DuploTrainBlocks.EXTENSION_ID,
            name: 'DUPLO Train',
            extensionURL: Scratch3DuploTrainBlocks.extensionURL,
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
                            value: '1'
                        },
                        {
                            text: '⬇',
                            value: '-1'
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
                            value: String(Sound.BRAKE)
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.departure',
                                default: 'departure'
                            }),
                            value: String(Sound.DEPARTURE)
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.refill',
                                default: 'refill'
                            }),
                            value: String(Sound.REFILL)
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.horn',
                                default: 'horn'
                            }),
                            value: String(Sound.HORN)
                        },
                        {
                            text: formatMessage({
                                id: 'duplotrain.steam',
                                default: 'steam'
                            }),
                            value: String(Sound.STEAM)
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
                SENSOR_COLOR: {
                    acceptReporters: false,
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
                                id: 'legobluetooth.blue',
                                default: '(3) Blue'
                            }),
                            value: String(Color.BLUE)
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
                                id: 'legobluetooth.yellow',
                                default: '(7) Yellow'
                            }),
                            value: String(Color.YELLOW)
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
                        {
                            text: formatMessage({
                                id: 'legobluetooth.noColor',
                                default: '(-1) No color'
                            }),
                            value: String(Color.NONE)
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
        setupTranslations(formatMessage, {
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

exports.blockClass = Scratch3DuploTrainBlocks;
module.exports = Scratch3DuploTrainBlocks;
