const setupTranslations = function (formatMessage, extTranslations = {}) {
    const localeSetup = formatMessage.setup();

    const translations = {
        'en': {
            'legobluetooth.motorPWM': '[PORT] start motor at [POWER] % power',
            'legobluetooth.motorStop': '[PORT] stop motor',
            'legobluetooth.motorRunFor': '[PORT] run [DIRECTION] for [VALUE] [UNIT]',
            'legobluetooth.motorGoDirectionToPosition': '[PORT] go [DIRECTION] to position [POSITION]',
            'legobluetooth.motorStart': '[PORT] start motor [DIRECTION]',
            'legobluetooth.motorSetSpeed': '[PORT] set speed to [SPEED] %',
            'legobluetooth.getRelativePosition': '[PORT] relative position',
            'legobluetooth.getPosition': '[PORT] position',
            'legobluetooth.motorResetRelativePosition': '[PORT] reset relative position to [RELATIVE_POSITION]',

            'legobluetooth.displayImageFor': 'turn on [MATRIX] for [DURATION] seconds',
            'legobluetooth.displayImage': 'turn on [MATRIX]',
            'legobluetooth.displayText': 'write [TEXT]',
            'legobluetooth.displayClear': 'turn off pixels',
            'legobluetooth.displaySetBrightness': 'set pixel brightness to [BRIGHTNESS] %',
            'legobluetooth.displaySetPixel': 'set pixel at [X] , [Y] to [BRIGHTNESS] %',
            'legobluetooth.centerButtonLights': 'set center button light to [COLOR]',
            'legobluetooth.ultrasonicLightUp': '[PORT] light up [LIGHT0] [LIGHT1] [LIGHT2] [LIGHT3]',

            'legobluetooth.getColor': '[PORT] color',
            'legobluetooth.getDistance': '[PORT] distance',
            'legobluetooth.getForce': '[PORT] force',
            'legobluetooth.getTilt': '[PORT] tilt [XY]',
            'legobluetooth.setHubLEDColor': 'set hub LED color to [COLOR]',
            'legobluetooth.getHubTilt': 'hub tilt [XYZ]',
            'legobluetooth.getAngle': '[AXIS] angle',

            'legobluetooth.getName': 'name',
            'legobluetooth.getFirmwareVersion': 'firmware version',
            'legobluetooth.getBatteryLevel': 'battery level',

            'legobluetooth.rotations': 'rotations',
            'legobluetooth.degrees': 'degrees',
            'legobluetooth.seconds': 'seconds',
            'legobluetooth.shortestPath': 'shortest',
            'legobluetooth.clockwise': 'clockwise',
            'legobluetooth.counterclockwise': 'counterclockwise',

            'legobluetooth.black': '(0) Black',
            'legobluetooth.pink': '(1) Pink',
            'legobluetooth.purple': '(2) Purple',
            'legobluetooth.blue': '(3) Blue',
            'legobluetooth.lightBlue': '(4) Light blue',
            'legobluetooth.lightGreen': '(5) Light green',
            'legobluetooth.green': '(6) Green',
            'legobluetooth.yellow': '(7) Yellow',
            'legobluetooth.orange': '(8) Orange',
            'legobluetooth.red': '(9) Red',
            'legobluetooth.white': '(10) White',
            'legobluetooth.noColor': '(-1) No color',

            'legobluetooth.pitch': 'pitch',
            'legobluetooth.roll': 'roll',
            'legobluetooth.yaw': 'yaw',
        },
        'it': {
        },
        'ja': {
            'legobluetooth.motorPWM': '[PORT] モーターを [POWER] %のパワーで回す',
            'legobluetooth.motorStop': '[PORT] モーターを止める',
            'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] 方向に [VALUE] [UNIT] 回す',
            'legobluetooth.motorGoDirectionToPosition': '[PORT] モーターを [DIRECTION] で位置 [POSITION] まで回す',
            'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] 方向に回す',
            'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] %にする',
            'legobluetooth.getRelativePosition': '[PORT] 相対位置',
            'legobluetooth.getPosition': '[PORT] 位置',
            'legobluetooth.motorResetRelativePosition': '[PORT] 相対位置を [RELATIVE_POSITION] にリセットする',

            'legobluetooth.displayImageFor': '[MATRIX] を [DURATION] 秒間オンにする',
            'legobluetooth.displayImage': '[MATRIX] をオンにする',
            'legobluetooth.displayText': '[TEXT] を表示する',
            'legobluetooth.displayClear': 'すべてのピクセルをオフにする',
            'legobluetooth.displaySetBrightness': 'ピクセルの明るさを [BRIGHTNESS] %にする',
            'legobluetooth.displaySetPixel': '[X] , [Y] のピクセルの明るさを [BRIGHTNESS] %にする',
            'legobluetooth.centerButtonLights': 'センターボタンのライトを [COLOR] にする',
            'legobluetooth.ultrasonicLightUp': '[PORT] を [LIGHT0] [LIGHT1] [LIGHT2] [LIGHT3] でライトアップする',

            'legobluetooth.getColor': '[PORT] 色',
            'legobluetooth.getDistance': '[PORT] 距離',
            'legobluetooth.getForce': '[PORT] 圧力',
            'legobluetooth.getTilt': '[PORT] 傾き [XY]',
            'legobluetooth.setHubLEDColor': 'ハブのLEDを [COLOR] にする',
            'legobluetooth.getHubTilt': 'ハブの傾き [XYZ]',
            'legobluetooth.getAngle': '[AXIS] 角',

            'legobluetooth.getName': '名前',
            'legobluetooth.getFirmwareVersion': 'ファームウェアバージョン',
            'legobluetooth.getBatteryLevel': '電池残量',

            'legobluetooth.rotations': '回転',
            'legobluetooth.degrees': '度',
            'legobluetooth.seconds': '秒',
            'legobluetooth.shortestPath': '最短経路',
            'legobluetooth.clockwise': '時計回り',
            'legobluetooth.counterclockwise': '反時計回り',

            'legobluetooth.black': '(0) 黒',
            'legobluetooth.pink': '(1) ピンク',
            'legobluetooth.purple': '(2) 紫',
            'legobluetooth.blue': '(3) 青',
            'legobluetooth.lightBlue': '(4) 水色',
            'legobluetooth.lightGreen': '(5) 明るい緑',
            'legobluetooth.green': '(6) 緑',
            'legobluetooth.yellow': '(7) 黄色',
            'legobluetooth.orange': '(8) オレンジ',
            'legobluetooth.red': '(9) 赤',
            'legobluetooth.white': '(10) 白',
            'legobluetooth.noColor': '(-1) 色なし',

            'legobluetooth.pitch': 'ピッチ',
            'legobluetooth.roll': 'ロール',
            'legobluetooth.yaw': 'ヨー',
        },
        'ja-Hira': {
            'legobluetooth.motorPWM': '[PORT] モーターを [POWER] %のパワーでまわす',
            'legobluetooth.motorStop': '[PORT] モーターをとめる',
            'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] ほうこうに [VALUE] [UNIT] まわす',
            'legobluetooth.motorGoDirectionToPosition': '[PORT] モーターを [DIRECTION] でいち [POSITION] までまわす',
            'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] ほうこうにまわす',
            'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] %にする',
            'legobluetooth.getRelativePosition': '[PORT] そうたいいち',
            'legobluetooth.getPosition': '[PORT] いち',
            'legobluetooth.motorResetRelativePosition': '[PORT] そうたいいちを [RELATIVE_POSITION] にリセットする',

            'legobluetooth.displayImageFor': '[MATRIX] を [DURATION] びょうかんオンにする',
            'legobluetooth.displayImage': '[MATRIX] をオンにする',
            'legobluetooth.displayText': '[TEXT] をひょうじする',
            'legobluetooth.displayClear': 'すべてのピクセルをオフにする',
            'legobluetooth.displaySetBrightness': 'ピクセルのあかるさを [BRIGHTNESS] %にする',
            'legobluetooth.displaySetPixel': '[X] , [Y] のピクセルのあかるさを [BRIGHTNESS] %にする',
            'legobluetooth.centerButtonLights': 'センターボタンのライトを [COLOR] にする',
            'legobluetooth.ultrasonicLightUp': '[PORT] を [LIGHT0] [LIGHT1] [LIGHT2] [LIGHT3] でライトアップする',

            'legobluetooth.getColor': '[PORT] いろ',
            'legobluetooth.getDistance': '[PORT] きょり',
            'legobluetooth.getForce': '[PORT] あつりょく',
            'legobluetooth.getTilt': '[PORT] かたむき [XY]',
            'legobluetooth.setHubLEDColor': 'ハブのLEDを [COLOR] にする',
            'legobluetooth.getHubTilt': 'ハブのかたむき [XYZ]',
            'legobluetooth.getAngle': '[AXIS] かく',

            'legobluetooth.getName': 'なまえ',
            'legobluetooth.getFirmwareVersion': 'ファームウェアバージョン',
            'legobluetooth.getBatteryLevel': 'でんちざんりょう',

            'legobluetooth.rotations': 'かいてん',
            'legobluetooth.degrees': 'ど',
            'legobluetooth.seconds': 'びょう',
            'legobluetooth.shortestPath': 'さいたんきょり',
            'legobluetooth.clockwise': 'とけいまわり',
            'legobluetooth.counterclockwise': 'はんとけいまわり',

            'legobluetooth.black': '(0) くろ',
            'legobluetooth.pink': '(1) ピンク',
            'legobluetooth.purple': '(2) むらさき',
            'legobluetooth.blue': '(3) あお',
            'legobluetooth.lightBlue': '(4) みずいろ',
            'legobluetooth.lightGreen': '(5) あかるいみどり',
            'legobluetooth.green': '(6) みどり',
            'legobluetooth.yellow': '(7) きいろ',
            'legobluetooth.orange': '(8) オレンジ',
            'legobluetooth.red': '(9) あか',
            'legobluetooth.white': '(10) しろ',
            'legobluetooth.noColor': '(-1) いろなし',

            'legobluetooth.pitch': 'ピッチ',
            'legobluetooth.roll': 'ロール',
            'legobluetooth.yaw': 'ヨー',
        }
    };

    for (const locale in translations) {
        if (extTranslations[locale]) {
            Object.assign(translations[locale], extTranslations[locale]);
        }

        if (!localeSetup.translations[locale]) {
            localeSetup.translations[locale] = {};
        }
        Object.assign(localeSetup.translations[locale], translations[locale]);
    }
};

module.exports = setupTranslations;
