const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

const Hub = require('./lib/hub');
const Color = require('./lib/color');
const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAEl0lEQVR4Ae2bT0jUQRTHZ9xV1/4cMio0aUUqyoQKuniooLBO0amgoi55icLASwpWYkZ2KZKii12KDJSg6JYUVAePGtQSFZLiHzCyQ5pbrk7zdnfW3WXmN7PO+ts/vQX5zW/em3m/99nvvPntz11C8IUEkAASQAJIAAkgASSABJAAEkACSAAJIAEk4B4BahrqzQvCZL77j5DwHDq7bGw+9BXkQxKZzEGpQJWi3L5YoXC345rGQwWaklL4eRX9se59tbGmq423/a6GW3IwVOCS0UUGahWYK0ow5fCtdqf0bqKy/71yP3CaGxXoRMfApqUu3jG/v8ZgOnuX4eEP4UmSFcGOHSsaGfvaRgg7wxgri49EKZ0ghD7ctHHzFdrb+zfeJtrDtbs+MsKqxbnsSAkN+PsHd8hsqr6cUSDAY2zhUjI8SAz6wBYBrEiVkl6FZbGbkp7FE7OWtgaaTeOGFzsDUTas9xNfyeqEgLOzv8jk5DDvC/s0JRjFiYf2kBC76inwsIqKbVxs0cXHGBkd/cTmF+Yp8VA9ZDFf9JgzChTXLd0BhNHh6H83EIAlCqCCwZmYJ7ShL7x8uU/MYNiwroGiZhnGi7mpaqqYD+qabLnGJliGhkktTQ6btUvYbXgAJhKTQS2FU3kpAEvcK20Ak3fNuBgJTbGrJ3RKTmS1TuKW1i6jWpoUMWtrYPJGkXTdy3JaEt2cUlF/1gJcFkLLMCkCtISKABGgJQHL4ahABGhJwHI4KhABWhKwHJ62TyKmnzAsrzfrhuMStnxLrBWoeqpieV05MzxrFQgf7N1+iZiRx1pm0a0VaBYmda/IE+bUx6VjBDxMEDVd95QpaxWYDhBuzJF1CsyWmiqejOveBFSgjpDGjgA1gHRmBKgjpLEjQA0gnRkB6ghp7Mr/C7fceLzU/2FrQuamub35lJQVKtDy/dTeB34eeG4ZIreHb9191DEBVKAjHr1Rq0D9FLntcaez0yiB9ma5GypQzsW4V6lA/nWvaf6NzlXeQh8JzQWNJ8w1x4sNDcpLhtyrag7zn2LRaZWTkwI/wqCSVWtVY/O+Py73MAtZwk4Au2DAuooaVuAplI3N6z7IGXKPJhlmIUtYenMIjvyhIr1ys7uPfwP2YCgUZN9HP9DZ6R95vZwhb1i2oDyA5/X6+MNp8qrt0sk63hAwwS32UtdAPuD67aeng3+Cj/hEB8sq98QG/SeNMDxfse+0Ch5wUCpQQAorsePJWX5ez/92wMYibPl4jG4YUPO62ppOPHCCB/lrAZpAaul4fJf/mvj8yhXFrG5vNd1YXiodNjY+RfreBdjM7z/8Osm99qZTF6SOKXZmMr5yCaeSg7eqsDE0FNrOwRx49nKQVW8po9Vby0npmohYp35Ok8DncRL4MsEFzDg8+tpb5W1MJYaTbybjp0WBkFxrT09RaGjuFi+153i1le7uPNgCx3cfEm49flz6iyInUE62TMVPG0CR3OWObvipVD1X2iFeITZF+tkIV91L3u661nRSeU8l5rA5Zjq+zbXjWCSABJAAEkACSAAJIAEkgASQABJAAkgACSABHYF/doZ0OkkMt+gAAAAASUVORK5CYII=';

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
