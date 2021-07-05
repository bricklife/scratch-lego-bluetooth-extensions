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
