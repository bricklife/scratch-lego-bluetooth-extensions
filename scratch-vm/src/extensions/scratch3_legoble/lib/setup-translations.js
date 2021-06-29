const setupTranslations = function (formatMessage, extTranslations = {}) {
    const localeSetup = formatMessage.setup();

    const translations = {
        'ja': {
            'legobluetooth.motorPWM': '[PORT] モーターを [POWER] %のパワーで回す',
            'legobluetooth.motorStop': '[PORT] モーターを止める',
            'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] 方向に [VALUE] [UNIT] 回す',
            'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] 方向に回す',
            'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] %にする',
            'legobluetooth.getRelativePosition': '[PORT] 相対位置',
            'legobluetooth.motorResetRelativePosition': '[PORT] 相対位置を [RELATIVE_POSITION] にリセットする',
            'legobluetooth.getColor': '[PORT] 色',
            'legobluetooth.getDistance': '[PORT] 距離',
            'legobluetooth.getForce': '[PORT] 圧力',
            'legobluetooth.getTilt': '[PORT] 傾き [XY]',
            'legobluetooth.setHubLEDColor': 'ハブのLEDを [COLOR] にする',
            'legobluetooth.getHubTilt': 'ハブの傾き [XYZ]',
            'legobluetooth.getName': '名前',
            'legobluetooth.getFirmwareVersion': 'ファームウェアバージョン',
            'legobluetooth.getBatteryLevel': '電池残量',

            'legobluetooth.clockwise': '時計回り',
            'legobluetooth.counterclockwise': '反時計回り',
            'legobluetooth.rotations': '回転',
            'legobluetooth.degrees': '度',
            'legobluetooth.seconds': '秒',

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
        },
        'ja-Hira': {
            'legobluetooth.motorPWM': '[PORT] モーターを [POWER] %のパワーでまわす',
            'legobluetooth.motorStop': '[PORT] モーターをとめる',
            'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] ほうこうに [VALUE] [UNIT] まわす',
            'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] ほうこうにまわす',
            'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] %にする',
            'legobluetooth.getRelativePosition': '[PORT] そうたいいち',
            'legobluetooth.motorResetRelativePosition': '[PORT] そうたいいちを [RELATIVE_POSITION] にリセットする',
            'legobluetooth.getColor': '[PORT] いろ',
            'legobluetooth.getDistance': '[PORT] きょり',
            'legobluetooth.getForce': '[PORT] あつりょく',
            'legobluetooth.getTilt': '[PORT] かたむき [XY]',
            'legobluetooth.setHubLEDColor': 'ハブのLEDを [COLOR] にする',
            'legobluetooth.getHubTilt': 'ハブのかたむき [XYZ]',
            'legobluetooth.getName': 'なまえ',
            'legobluetooth.getFirmwareVersion': 'ファームウェアバージョン',
            'legobluetooth.getBatteryLevel': 'でんちざんりょう',

            'legobluetooth.clockwise': 'とけいまわり',
            'legobluetooth.counterclockwise': 'はんとけいまわり',
            'legobluetooth.rotations': 'かいてん',
            'legobluetooth.degrees': 'ど',
            'legobluetooth.seconds': 'びょう',

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
}

module.exports = setupTranslations;
