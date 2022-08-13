const setupTranslations = function (formatMessage, extTranslations = {}) {
    const localeSetup = formatMessage.setup();

    const translations = {
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
        },
        'pl': {
            'legobluetooth.black': '(0) czarny',
            'legobluetooth.pink': '(1) różowy',
            'legobluetooth.purple': '(2) fioletowy',
            'legobluetooth.blue': '(3) niebieski',
            'legobluetooth.lightBlue': '(4) jasnoniebieski',
            'legobluetooth.lightGreen': '(5) jasnozielony',
            'legobluetooth.green': '(6) zielony',
            'legobluetooth.yellow': '(7) żółty',
            'legobluetooth.orange': '(8) pomarańczowy',
            'legobluetooth.red': '(9) czerwony',
            'legobluetooth.white': '(10) biały',
            'legobluetooth.noColor': '(-1) brak koloru',            
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
