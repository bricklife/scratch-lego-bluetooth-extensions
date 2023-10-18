const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

const Hub = require('./lib/hub');
const Color = require('./lib/color');
const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,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';

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/legoremote.mjs';

const PortId = {
    BUTTON_A: 0x00,
    BUTTON_B: 0x01,
};

const Button = {
    NONE: 0,
    PLUS: 1,
    MINUS: -1,
    STOP: 127,
    ANY: 255,
};

class Scratch3LegoRemoteBlocks {

    static get EXTENSION_ID() {
        return 'legoremote';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        this._peripheral = new Hub(runtime, Scratch3LegoRemoteBlocks.EXTENSION_ID, 0x42);

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        this._setupTranslations();

        return {
            id: Scratch3LegoRemoteBlocks.EXTENSION_ID,
            name: 'LEGO Remote',
            extensionURL: Scratch3LegoRemoteBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'whenButton',
                    text: formatMessage({
                        id: 'legoremote.whenButton',
                        default: '[PORT] when [BUTTON] button pressed'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'BUTTON',
                            defaultValue: Button.PLUS
                        }
                    }
                },
                {
                    opcode: 'isButton',
                    text: formatMessage({
                        id: 'legoremote.isButton',
                        default: '[PORT] [BUTTON] button pressed?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'BUTTON',
                            defaultValue: Button.PLUS
                        }
                    }
                },
                '---',
                {
                    opcode: 'getButtonA',
                    text: formatMessage({
                        id: 'legoremote.getButtonA',
                        default: 'button A'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getButtonB',
                    text: formatMessage({
                        id: 'legoremote.getButtonB',
                        default: 'button B'
                    }),
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'setHubLEDColor',
                    text: formatMessage({
                        id: 'legoremote.setHubLEDColor',
                        default: 'set LED color to [COLOR]'
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
            ],
            menus: {
                PORT: {
                    acceptReporters: true,
                    items: ['A', 'B'],
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
                BUTTON: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legoremote.button.plus',
                                default: 'plus'
                            }),
                            value: String(Button.PLUS)
                        },
                        {
                            text: formatMessage({
                                id: 'legoremote.button.minus',
                                default: 'minus'
                            }),
                            value: String(Button.MINUS)
                        },
                        {
                            text: formatMessage({
                                id: 'legoremote.button.stop',
                                default: 'red'
                            }),
                            value: String(Button.STOP)
                        },
                        {
                            text: formatMessage({
                                id: 'legoremote.button.any',
                                default: 'any'
                            }),
                            value: String(Button.ANY)
                        },
                    ]
                },
            }
        };
    }

    _validatePorts(text) {
        return text.toUpperCase().replace(/[^AB]/g, '')
            .split('')
            .filter((x, i, self) => self.indexOf(x) === i)
            .sort();
    }

    setHubLEDColor(args) {
        const color = Cast.toNumber(args.COLOR);
        return this._peripheral.setLEDColor(color).then(waitPromise);
    }

    whenButton(args) {
        return this.isButton(args);
    }

    isButton(args) {
        const port = this._validatePorts(Cast.toString(args.PORT)).shift();
        const portId = ['A', 'B'].indexOf(port);
        const button = Cast.toNumber(args.BUTTON);

        const value = this._getSensorValue(portId, 'button', Button.NONE);
        if (button == Button.ANY) {
            return value != Button.NONE;
        } else {
            return value == button;
        }
    }

    getButtonA() {
        return this._getSensorValue(PortId.BUTTON_A, 'button', Button.NONE);
    }

    getButtonB() {
        return this._getSensorValue(PortId.BUTTON_B, 'button', Button.NONE);
    }

    _getSensorValue(portId, key, defaultValue) {
        const value = this._peripheral.inputValue(portId, key);
        return value != null ? value : defaultValue;
    }

    _setupTranslations() {
        setupTranslations(formatMessage, {
            'en': {
                'legoremote.whenButton': '[PORT] when [BUTTON] button pressed',
                'legoremote.isButton': '[PORT] [BUTTON] button pressed?',
                'legoremote.getButtonA': 'button A',
                'legoremote.getButtonB': 'button B',
                'legoremote.setHubLEDColor': 'set LED color to [COLOR]',

                'legoremote.button.plus': 'plus',
                'legoremote.button.minus': 'minus',
                'legoremote.button.stop': 'red',
                'legoremote.button.any': 'any',
            },
            'ja': {
                'legoremote.whenButton': '[PORT] [BUTTON] ボタンが押されたとき',
                'legoremote.isButton': '[PORT] [BUTTON] ボタンが押された',
                'legoremote.getButtonA': 'ボタン A',
                'legoremote.getButtonB': 'ボタン B',
                'legoremote.setHubLEDColor': 'LEDの色を [COLOR] にする',

                'legoremote.button.plus': 'プラス',
                'legoremote.button.minus': 'マイナス',
                'legoremote.button.stop': '赤い',
                'legoremote.button.any': 'どれかの',
            },
            'ja-Hira': {
                'legoremote.whenButton': '[PORT] [BUTTON] ボタンがおされたとき',
                'legoremote.isButton': '[PORT] [BUTTON] ボタンがおされた',
                'legoremote.getButtonA': 'ボタン A',
                'legoremote.getButtonB': 'ボタン B',
                'legoremote.setHubLEDColor': 'LEDのいろを [COLOR] にする',

                'legoremote.button.plus': 'プラス',
                'legoremote.button.minus': 'マイナス',
                'legoremote.button.stop': 'あかい',
                'legoremote.button.any': 'どれかの',
            }
        });
    }
}

exports.blockClass = Scratch3LegoRemoteBlocks;
module.exports = Scratch3LegoRemoteBlocks;
