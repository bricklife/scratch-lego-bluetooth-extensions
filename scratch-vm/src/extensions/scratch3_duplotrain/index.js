const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

const Hub = require('../scratch3_legoble/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAABDtJREFUeAHtm01IVFEUx88bxzIdi4xamFa4CDJIohBapOBCGTFok0RtI2jTwk0JBYJBtahtEG5zYZugcNBFkJs2RSRY0EIqzSDSvkYtG33dM+Ot8fHOu+f53jg+Ow/kzjv33HPu/b3//ZgPAeQSAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACkSFg+enpk4dgu/k3n4BsHFO9W9uo22JRH0Cx+29UIKWqteq4Vvda5fObRxTol5jDP+64J2+bjpFVBakYeVqQsKEHFQUGRMpWYFQUYeIxWOF+kmifzZ0kTO2d9aJAJxGf98ZdWMfTTy7J1qxu6a9MZXL+TkUMbYXk0iLcVQfRGreIaiCTsRI43/YdUm71qQp4ptoecavTNhXjeXIWjup7ThkZBXrBw4EiWPQhBx3zqNONOD7ad7kssJ4c2QLcauVRMwCVq33c0pSVQf/Pebhl25BoKgGoWJ57s6rRyCKAZUEafeCHW2vaFgpAPe3oNO41FAz01kuGs6UpF9Vufu5fJATmvJDnwi84rgrXJcDpr+8jM4V1hwtVLillei4BROJQFKhjz6XzHrM2upTliXIX60qTlzpXeoZzZ1oCqCyiQIoM0y4AmaAoNwFIkWHaBSATFOUmACkyTLsAZIKi3AQgRYZpF4BMUJSbAKTIMO2hvhPhvMNg9isybqLAgI8qFAWu9fvWgGMOtbkoMCDOUBQYsA+uzU2f+7k2CsGoP090fqVAhRYFUmSY9nWnwGKvp36VLwpkKo1yE4AUGaZdADJBUW4CkCLDtAtAJijKbfnrZaoa4Mr1e+qr5//3utZ91pORKDCgNtjnwNT9mwFTRat58tQlVoeNCrTASmOkkngpK+BGcNJj1WP3GhNDgfZ7FaC+cttO+Do95RUrUnWPBoc5/U30dnu7GRWofraUzVSz75B3pP+0lqFA6FPb0MXauobYx4nXMP3p3YZA1dHe6jqOHbv2QmPzafy975ISj1E1RgX2Xj4zZltwB7M1NHYAJtioF44Nx4gXjhnHbhorR4EQryvtyoxnDmzekmjBpzMx/hIm345C+ttnyGQWTDnWdT1uGLi+4xKlZlmur5b1OF4X7+J03POQmB+gZ2BgU2b8923LhgvqZG1Ubn7bqLzGaYvKQ8H0dHaylMEGqCFcvdF/UL0+B7bdqpLVqt/VVuq6KJa5o4o6aeQ2yz7OtM0fp2+A+Y3xdRaobY+iKk+2HYbd1VVOlxX3H6Zm4MHQi7+LtN8Orwi2DvIHnor5m8zwyBggIOrCOvTBi7tIU7G0vdj5WZuI7ixV6k1mbn6hBdVVv786+1e1PZFtMvMlDa/eTGX/sgYfizSVM99ezPyBp7AeCGeTWc0ireObymLlDw2gHmD+JqP++2JPzr76RVrH5ZbFzs/tp/gJASEgBISAEBACQkAICAEhIASEgBAQAkJACKyGwB8od0IZW+SbHgAAAABJRU5ErkJggg==';

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
    COLOR_SENSOR: 0x12,
};

class Scratch3DuploTrainBlocks {

    static get EXTENSION_ID() {
        return 'duplotrain';
    }

    constructor(runtime) {
        this.runtime = runtime;

        this._peripheral = new Hub(this.runtime, Scratch3DuploTrainBlocks.EXTENSION_ID);
    }

    getInfo() {
        this.setupTranslations();

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
                '---',
                {
                    opcode: 'whenColor',
                    text: formatMessage({
                        id: 'duplotrain.whenColor',
                        default: 'when color is [SENSOR_COLOR]'
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
                        default: 'color is [SENSOR_COLOR] ?'
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
                        default: 'color'
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
                                default: 'black'
                            }),
                            value: Color.BLACK
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.pink',
                                default: 'pink'
                            }),
                            value: Color.PINK
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.purple',
                                default: 'purple'
                            }),
                            value: Color.PURPLE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.blue',
                                default: 'blue'
                            }),
                            value: Color.BLUE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.lightBlue',
                                default: 'light blue'
                            }),
                            value: Color.LIGHT_BLUE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.lightGreen',
                                default: 'light green'
                            }),
                            value: Color.LIGHT_GREEN
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.green',
                                default: 'green'
                            }),
                            value: Color.GREEN
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.yellow',
                                default: 'yellow'
                            }),
                            value: Color.YELLOW
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.orange',
                                default: 'orange'
                            }),
                            value: Color.ORANGE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.red',
                                default: 'red'
                            }),
                            value: Color.RED
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.white',
                                default: 'white'
                            }),
                            value: Color.WHITE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.noColor',
                                default: 'no color'
                            }),
                            value: Color.NONE
                        },
                    ]
                },
                SENSOR_COLOR: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legobluetooth.black',
                                default: 'black'
                            }),
                            value: Color.BLACK
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.blue',
                                default: 'blue'
                            }),
                            value: Color.BLUE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.lightGreen',
                                default: 'light green'
                            }),
                            value: Color.LIGHT_GREEN
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.yellow',
                                default: 'yellow'
                            }),
                            value: Color.YELLOW
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.red',
                                default: 'red'
                            }),
                            value: Color.RED
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.white',
                                default: 'white'
                            }),
                            value: Color.WHITE
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.noColor',
                                default: 'no color'
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

    _getSensorValue(portId, key, defaultValue) {
        const value = this._peripheral.inputValue(portId, key);
        return value != null ? value : defaultValue;
    }

    setupTranslations() {
        const localeSetup = formatMessage.setup();
        const extTranslations = {
            'ja': {
                'legobluetooth.black': '黒',
                'legobluetooth.pink': 'ピンク',
                'legobluetooth.purple': '紫',
                'legobluetooth.blue': '青',
                'legobluetooth.lightBlue': '水色',
                'legobluetooth.lightGreen': '明るい緑',
                'legobluetooth.green': '緑',
                'legobluetooth.yellow': '黄色',
                'legobluetooth.orange': 'オレンジ',
                'legobluetooth.red': '赤',
                'legobluetooth.white': '白',
                'legobluetooth.noColor': '色なし',
            },
            'ja-Hira': {
                'legobluetooth.black': 'くろ',
                'legobluetooth.pink': 'ピンク',
                'legobluetooth.purple': 'むらさき',
                'legobluetooth.blue': 'あお',
                'legobluetooth.lightBlue': 'みずいろ',
                'legobluetooth.lightGreen': 'あかるいみどり',
                'legobluetooth.green': 'みどり',
                'legobluetooth.yellow': 'きいろ',
                'legobluetooth.orange': 'オレンジ',
                'legobluetooth.red': 'あか',
                'legobluetooth.white': 'しろ',
                'legobluetooth.noColor': 'いろなし',
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

module.exports = Scratch3DuploTrainBlocks;
