const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

const Hub = require('./lib/hub');
const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,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';

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/legomario.mjs';

const Color = {
    WHITE: 0x0013,
    RED: 0x0015,
    BLUE: 0x0017,
    YELLOW: 0x0018,
    BLACK: 0x001a,
    GREEN: 0x0025,
    BROWN: 0x006a,
    PURPLE: 0x010c,
    CYAN: 0x0142,
    NONE: -1,
};

const Pants = {
    NONE: 0x00,
    TANOOKI: 0x0a,
    PROPELLER: 0x0c,
    CAT: 0x11,
    FIRE: 0x12,
    PENGUIN: 0x14,
    NORMAL: 0x21,
    BUILDER: 0x22,
};

const PortId = {
    COLOR_BARCODE: 0x01,
    PANTS: 0x02,
};

class Scratch3LEGOMarioBlocks {

    static get EXTENSION_ID() {
        return 'legomario';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        this._peripheral = new Hub(runtime, Scratch3LEGOMarioBlocks.EXTENSION_ID, 0x43);

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        this._setupTranslations();

        return {
            id: Scratch3LEGOMarioBlocks.EXTENSION_ID,
            name: 'LEGO Mario',
            extensionURL: Scratch3LEGOMarioBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'whenBarcode',
                    text: formatMessage({
                        id: 'legomario.whenBarcode',
                        default: 'when barcode is [BARCODE]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        BARCODE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    }
                },
                {
                    opcode: 'whenAnyBarcode',
                    text: formatMessage({
                        id: 'legomario.whenAnyBarcode',
                        default: 'when any barcode is found'
                    }),
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'getBarcode',
                    text: formatMessage({
                        id: 'legomario.getBarcode',
                        default: 'barcode'
                    }),
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'whenColor',
                    text: formatMessage({
                        id: 'legomario.whenColor',
                        default: 'when color is [SENSOR_COLOR]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        SENSOR_COLOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'SENSOR_COLOR',
                            defaultValue: Color.WHITE
                        }
                    }
                },
                {
                    opcode: 'isColor',
                    text: formatMessage({
                        id: 'legomario.isColor',
                        default: 'color is [SENSOR_COLOR] ?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        SENSOR_COLOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'SENSOR_COLOR',
                            defaultValue: Color.WHITE
                        }
                    }
                },
                {
                    opcode: 'getColor',
                    text: formatMessage({
                        id: 'legomario.getColor',
                        default: 'color'
                    }),
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'whenPants',
                    text: formatMessage({
                        id: 'legomario.whenPants',
                        default: 'when pants is [PANTS]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        PANTS: {
                            type: ArgumentType.NUMBER,
                            menu: 'PANTS',
                            defaultValue: Pants.NORMAL
                        }
                    }
                },
                {
                    opcode: 'isPants',
                    text: formatMessage({
                        id: 'legomario.isPants',
                        default: 'pants is [PANTS] ?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PANTS: {
                            type: ArgumentType.NUMBER,
                            menu: 'PANTS',
                            defaultValue: Pants.NORMAL
                        }
                    }
                },
                {
                    opcode: 'getPants',
                    text: formatMessage({
                        id: 'legomario.getPants',
                        default: 'pants'
                    }),
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'setVolume',
                    text: formatMessage({
                        id: 'legomario.setVolume',
                        default: 'set volume to [VOLUME] %'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
            ],
            menus: {
                SENSOR_COLOR: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legomario.white',
                                default: '(19) White'
                            }),
                            value: String(Color.WHITE)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.red',
                                default: '(21) Red'
                            }),
                            value: String(Color.RED)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.blue',
                                default: '(23) Blue'
                            }),
                            value: String(Color.BLUE)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.yellow',
                                default: '(24) Yellow'
                            }),
                            value: String(Color.YELLOW)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.black',
                                default: '(26) Black'
                            }),
                            value: String(Color.BLACK)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.green',
                                default: '(37) Green'
                            }),
                            value: String(Color.GREEN)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.brown',
                                default: '(106) Brown'
                            }),
                            value: String(Color.BROWN)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.purple',
                                default: '(268) Purple'
                            }),
                            value: String(Color.PURPLE)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.cyan',
                                default: '(322) Cyan'
                            }),
                            value: String(Color.CYAN)
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
                PANTS: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legomario.pants.none',
                                default: '(0) None'
                            }),
                            value: String(Pants.NONE)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.tanooki',
                                default: '(10) Tanooki'
                            }),
                            value: String(Pants.TANOOKI)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.propeller',
                                default: '(12) Propeller'
                            }),
                            value: String(Pants.PROPELLER)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.cat',
                                default: '(17) Cat'
                            }),
                            value: String(Pants.CAT)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.fire',
                                default: '(18) Fire'
                            }),
                            value: String(Pants.FIRE)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.penguin',
                                default: '(20) Penguin'
                            }),
                            value: String(Pants.PENGUIN)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.normal',
                                default: '(33) Normal'
                            }),
                            value: String(Pants.NORMAL)
                        },
                        {
                            text: formatMessage({
                                id: 'legomario.pants.builder',
                                default: '(34) Builder'
                            }),
                            value: String(Pants.BUILDER)
                        },
                    ]
                },
            }
        };
    }

    whenBarcode(args) {
        return this.getBarcode() == Cast.toNumber(args.BARCODE);
    }

    whenAnyBarcode() {
        return this.getBarcode() != -1;
    }

    getBarcode() {
        return this._getSensorValue(PortId.COLOR_BARCODE, 'barcode', -1);
    }

    whenColor(args) {
        return this.getColor() == args.SENSOR_COLOR;
    }

    isColor(args) {
        return this.getColor() == args.SENSOR_COLOR;
    }

    getColor() {
        return this._getSensorValue(PortId.COLOR_BARCODE, 'color', Color.NONE);
    }

    whenPants(args) {
        return this.getPants() == args.PANTS;
    }

    isPants(args) {
        return this.getPants() == args.PANTS;
    }

    getPants() {
        return this._getSensorValue(PortId.PANTS, 'pants', Pants.NONE);
    }

    setVolume(args) {
        const volume = Cast.toNumber(args.VOLUME);
        return this._peripheral.setVolume(volume).then(waitPromise);
    }

    _getSensorValue(portId, key, defaultValue) {
        const value = this._peripheral.inputValue(portId, key);
        return value != null ? value : defaultValue;
    }

    _setupTranslations() {
        setupTranslations(formatMessage, {
            'ja': {
                'legomario.whenBarcode': 'バーコードが [BARCODE] のとき',
                'legomario.whenAnyBarcode': 'バーコードを見つけたとき',
                'legomario.getBarcode': 'バーコード',
                'legomario.whenColor': '色が [SENSOR_COLOR] のとき',
                'legomario.isColor': '色が [SENSOR_COLOR]',
                'legomario.getColor': '色',
                'legomario.whenPants': 'ズボンが [PANTS] のとき',
                'legomario.isPants': 'ズボンが [PANTS]',
                'legomario.getPants': 'ズボン',
                'legomario.setVolume': '音量を [VOLUME] %にする',

                'legomario.white': '(19) 白',
                'legomario.red': '(21) 赤',
                'legomario.blue': '(23) 青',
                'legomario.yellow': '(24) 黄色',
                'legomario.black': '(26) 黒',
                'legomario.green': '(37) 緑',
                'legomario.brown': '(106) 茶色',
                'legomario.purple': '(268) 紫',
                'legomario.cyan': '(322) シアン',

                'legomario.pants.none': '(0) なし',
                'legomario.pants.tanooki': '(10) タヌキ',
                'legomario.pants.propeller': '(12) プロペラ',
                'legomario.pants.cat': '(17) ネコ',
                'legomario.pants.fire': '(18) ファイア',
                'legomario.pants.penguin': '(20) ペンギン',
                'legomario.pants.normal': '(33) ノーマル',
                'legomario.pants.builder': '(34) ビルダー',
            },
            'ja-Hira': {
                'legomario.whenBarcode': 'バーコードが [BARCODE] のとき',
                'legomario.whenAnyBarcode': 'バーコードをみつけたとき',
                'legomario.getBarcode': 'バーコード',
                'legomario.whenColor': 'いろが [SENSOR_COLOR] のとき',
                'legomario.isColor': 'いろが [SENSOR_COLOR]',
                'legomario.getColor': 'いろ',
                'legomario.whenPants': 'ズボンが [PANTS] のとき',
                'legomario.isPants': 'ズボンが [PANTS]',
                'legomario.getPants': 'ズボン',
                'legomario.setVolume': 'おんりょうを [VOLUME] %にする',

                'legomario.white': '(19) しろ',
                'legomario.red': '(21) あか',
                'legomario.blue': '(23) あお',
                'legomario.yellow': '(24) きいろ',
                'legomario.black': '(26) くろ',
                'legomario.green': '(37) みどり',
                'legomario.brown': '(106) ちゃいろ',
                'legomario.purple': '(268) むらさき',
                'legomario.cyan': '(322) シアン',

                'legomario.pants.none': '(0) なし',
                'legomario.pants.tanooki': '(10) タヌキ',
                'legomario.pants.propeller': '(12) プロペラ',
                'legomario.pants.cat': '(17) ネコ',
                'legomario.pants.fire': '(18) ファイア',
                'legomario.pants.penguin': '(20) ペンギン',
                'legomario.pants.normal': '(33) ノーマル',
                'legomario.pants.builder': '(34) ビルダー',
            },
        });
    }
}

exports.blockClass = Scratch3LEGOMarioBlocks;
module.exports = Scratch3LEGOMarioBlocks;
