const ArgumentType = require('../../../extension-support/argument-type');
const BlockType = require('../../../extension-support/block-type');
const Cast = require('../../../util/cast');

const setupTranslations = require('./setup-translations');

const BLESendInterval = 100;
const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

const Color = {
    WHITE: 0x0013,
    RED: 0x0015,
    BLUE: 0x0017,
    YELLOW: 0x0018,
    BLACK: 0x001a,
    GREEN: 0x0025,
    BROWN: 0x006a,
    PURPLE: 0x010c,
    NOUGAT_BROWN: 0x0138,
    CYAN: 0x0142,
    NONE: -1,
};

const Pants = {
    NONE: 0x00,
    BEE: 0x03,
    LUIGI: 0x05,
    FROG: 0x06,
    TANOOKI: 0x0a,
    PROPELLER: 0x0c,
    CAT: 0x11,
    FIRE: 0x12,
    PENGUIN: 0x14,
    PEACH: 0x18,
    MARIO: 0x21,
    BUILDER: 0x22,
    ICE: 0x23,
};

const PortId = {
    COLOR_BARCODE: 0x01,
    PANTS: 0x02,
};

class MarioBaseBlocks {

    constructor(peripheral) {
        this._peripheral = peripheral;
    }

    getBlocks(formatMessage) {
        return [
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
                        defaultValue: Color.RED
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
                        defaultValue: Color.RED
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
                        defaultValue: Pants.FIRE
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
                        defaultValue: Pants.FIRE
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
        ]
    }

    getMenus(formatMessage) {
        return {
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
                            id: 'legomario.nougatBrown',
                            default: '(312) Nougat Brown'
                        }),
                        value: String(Color.NOUGAT_BROWN)
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
                            id: 'legomario.pants.bee',
                            default: '(3) Bee'
                        }),
                        value: String(Pants.BEE)
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.luigi',
                            default: '(5) Luigi'
                        }),
                        value: String(Pants.LUIGI)
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.frog',
                            default: '(6) Frog'
                        }),
                        value: String(Pants.FROG)
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
                            id: 'legomario.pants.peach',
                            default: '(24) Peach'
                        }),
                        value: String(Pants.PEACH)
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.mario',
                            default: '(33) Mario'
                        }),
                        value: String(Pants.MARIO)
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.builder',
                            default: '(34) Builder'
                        }),
                        value: String(Pants.BUILDER)
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.ice',
                            default: '(35) Ice'
                        }),
                        value: String(Pants.ICE)
                    },
                ]
            },
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

    setupTranslations(formatMessage) {
        setupTranslations(formatMessage, {
            'en': {
                'legomario.whenBarcode': 'when barcode is [BARCODE]',
                'legomario.whenAnyBarcode': 'when any barcode is found',
                'legomario.getBarcode': 'barcode',
                'legomario.whenColor': 'when color is [SENSOR_COLOR]',
                'legomario.isColor': 'color is [SENSOR_COLOR] ?',
                'legomario.getColor': 'color',
                'legomario.whenPants': 'when pants is [PANTS]',
                'legomario.isPants': 'pants is [PANTS] ?',
                'legomario.getPants': 'pants',
                'legomario.setVolume': 'set volume to [VOLUME] %',

                'legomario.white': '(19) White',
                'legomario.red': '(21) Red',
                'legomario.blue': '(23) Blue',
                'legomario.yellow': '(24) Yellow',
                'legomario.black': '(26) Black',
                'legomario.green': '(37) Green',
                'legomario.brown': '(106) Brown',
                'legomario.purple': '(268) Purple',
                'legomario.nougatBrown': '(312) Nougat Brown',
                'legomario.cyan': '(322) Cyan',

                'legomario.pants.none': '(0) None',
                'legomario.pants.bee': '(3) Bee',
                'legomario.pants.luigi': '(5) Luigi',
                'legomario.pants.frog': '(6) Frog',
                'legomario.pants.tanooki': '(10) Tanooki',
                'legomario.pants.propeller': '(12) Propeller',
                'legomario.pants.cat': '(17) Cat',
                'legomario.pants.fire': '(18) Fire',
                'legomario.pants.penguin': '(20) Penguin',
                'legomario.pants.peach': '(24) Peach',
                'legomario.pants.mario': '(33) Mario',
                'legomario.pants.builder': '(34) Builder',
                'legomario.pants.ice': '(35) Ice',
            },
            'it': {
                'legomario.whenBarcode': 'quando il codice a barre è [BARCODE]',
                'legomario.whenAnyBarcode': 'quando si trova codice a barre',
                'legomario.getBarcode': 'codice a barre',
                'legomario.whenColor': 'quando il colore è [SENSOR_COLOR]',
                'legomario.isColor': 'il colore è [SENSOR_COLOR] ?',
                'legomario.getColor': 'colore',
                'legomario.whenPants': 'quando indossa i pantaloni [PANTS]',
                'legomario.isPants': 'pantaloni sono [PANTS] ?',
                'legomario.getPants': 'pantaloni',
                'legomario.setVolume': 'resetta il volume a [VOLUME] %',

                'legomario.white': '(19) Bianco',
                'legomario.red': '(21) Rosso',
                'legomario.blue': '(23) Blu',
                'legomario.yellow': '(24) Giallo',
                'legomario.black': '(26) Nero',
                'legomario.green': '(37) Verde',
                'legomario.brown': '(106) Marrone',
                'legomario.purple': '(268) Viola',
                'legomario.nougatBrown': '(312) Beige',
                'legomario.cyan': '(322) Azzurro',

                'legomario.pants.none': '(0) Nessuno',
                'legomario.pants.bee': '(3) Ape',
                'legomario.pants.luigi': '(5) Luigi',
                'legomario.pants.frog': '(6) Rana',
                'legomario.pants.tanooki': '(10) Orsetto lavatore',
                'legomario.pants.propeller': '(12) Elica',
                'legomario.pants.cat': '(17) Gatto',
                'legomario.pants.fire': '(18) Fuoco',
                'legomario.pants.penguin': '(20) Pinguino',
                'legomario.pants.peach': '(24) Peach',
                'legomario.pants.mario': '(33) Mario',
                'legomario.pants.builder': '(34) Costruttore',
                'legomario.pants.ice': '(35) Ghiaccio',
            },
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
                'legomario.nougatBrown': '(312) 薄茶色',
                'legomario.cyan': '(322) シアン',

                'legomario.pants.none': '(0) なし',
                'legomario.pants.bee': '(3) ハチ',
                'legomario.pants.luigi': '(5) ルイージ',
                'legomario.pants.frog': '(6) カエル',
                'legomario.pants.tanooki': '(10) タヌキ',
                'legomario.pants.propeller': '(12) プロペラ',
                'legomario.pants.cat': '(17) ネコ',
                'legomario.pants.fire': '(18) ファイア',
                'legomario.pants.penguin': '(20) ペンギン',
                'legomario.pants.peach': '(24) ピーチ',
                'legomario.pants.mario': '(33) マリオ',
                'legomario.pants.builder': '(34) ビルダー',
                'legomario.pants.ice': '(35) アイス',
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
                'legomario.nougatBrown': '(312) うすちゃいろ',
                'legomario.cyan': '(322) シアン',

                'legomario.pants.none': '(0) なし',
                'legomario.pants.bee': '(3) ハチ',
                'legomario.pants.luigi': '(5) ルイージ',
                'legomario.pants.frog': '(6) カエル',
                'legomario.pants.tanooki': '(10) タヌキ',
                'legomario.pants.propeller': '(12) プロペラ',
                'legomario.pants.cat': '(17) ネコ',
                'legomario.pants.fire': '(18) ファイア',
                'legomario.pants.penguin': '(20) ペンギン',
                'legomario.pants.peach': '(24) ピーチ',
                'legomario.pants.mario': '(33) マリオ',
                'legomario.pants.builder': '(34) ビルダー',
                'legomario.pants.ice': '(35) アイス',
            },
        });
    }
}

module.exports = MarioBaseBlocks;
