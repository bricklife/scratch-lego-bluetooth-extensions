const MathUtil = require('../../util/math-util');

const IOType = require('./io-type');

class GenericDevice {

    constructor(ioType) {
        this._ioType = ioType;
        this._inputValues = {};
    }

    get ioType() {
        return this._ioType;
    }

    get mode() {
        switch (this._ioType) {
            case IOType.MEDIUM_LINEAR_MOTOR:
            case IOType.MOVE_HUB_MOTOR:
            case IOType.TECHNIC_LARGE_MOTOR:
            case IOType.TECHNIC_XL_MOTOR:
            case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
            case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
                return 2;
            case IOType.TILT_SENSOR:
                return 0;
            case IOType.MOTION_SENSOR:
                return 0;
            case IOType.COLOR_DISTANCE_SENSOR:
                return 8;
            case IOType.MOVE_HUB_TILT_SENSOR:
                return 0;
            case IOType.DUPLO_TRAIN_BASE_SPEAKER:
                return 1;
            case IOType.DUPLO_TRAIN_BASE_COLOR_SENSOR:
                return 0;
            case IOType.DUPLO_TRAIN_BASE_SPEEDOMETER:
                return 1;
            case IOType.TECHNIC_HUB_TILT_SENSOR:
                return 0;
            default:
                return null;
        }
    }

    get inputValues() {
        return this._inputValues;
    }

    updateInputValues(data) {
        if (data.length == 0) {
            this._inputValues = {};
            return;
        }

        const buffer = Buffer.from(data);

        switch (this._ioType) {
            case IOType.MEDIUM_LINEAR_MOTOR:
            case IOType.MOVE_HUB_MOTOR:
            case IOType.TECHNIC_LARGE_MOTOR:
            case IOType.TECHNIC_XL_MOTOR:
            case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
            case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
                this._inputValues = {
                    degreesCounted: buffer.readInt32LE(0)
                };
                break;

            case IOType.TILT_SENSOR:
                this._inputValues = {
                    tiltX: buffer.readInt8(0),
                    tiltY: buffer.readInt8(1)
                };
                break;

            case IOType.MOTION_SENSOR:
                this._inputValues = {
                    distance: data[0]
                };
                break;

            case IOType.COLOR_DISTANCE_SENSOR:
                this._inputValues = {
                    color: buffer.readInt8(0),
                    distance: buffer.readInt8(1)
                };
                break;

            case IOType.MOVE_HUB_TILT_SENSOR:
                this._inputValues = {
                    tiltX: buffer.readInt8(0),
                    tiltY: buffer.readInt8(1)
                };
                break;

            case IOType.DUPLO_TRAIN_BASE_COLOR_SENSOR:
                this._inputValues = {
                    color: buffer.readInt8(0)
                };
                break;

            case IOType.DUPLO_TRAIN_BASE_SPEEDOMETER:
                this._inputValues = {
                    drivingDistance: buffer.readInt32LE(0)
                };
                break;

            case IOType.TECHNIC_HUB_TILT_SENSOR:
                this._inputValues = {
                    tiltX: buffer.readInt16LE(4),
                    tiltY: buffer.readInt16LE(2),
                    tiltZ: buffer.readInt16LE(0)
                };
                break;

            default:
                this._inputValues = {};
                break;
        }

        this._inputValues.bytes = data;
    }
}

class Motor extends GenericDevice {

    constructor(ioType) {
        super(ioType);

        switch (ioType) {
            case IOType.MEDIUM_LINEAR_MOTOR:
            case IOType.MOVE_HUB_MOTOR:
                this._canUseSpeed = true;
                this._canUsePosition = false;
                this._speed = 75;
                break;

            case IOType.TECHNIC_LARGE_MOTOR:
            case IOType.TECHNIC_XL_MOTOR:
            case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
            case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
                this._canUseSpeed = true;
                this._canUsePosition = true;
                this._speed = 75;
                break;

            default:
                this._canUseSpeed = false;
                this._canUsePosition = false;
                this._speed = 0;
        }
    }

    get canUseSpeed() {
        return this._canUseSpeed;
    }

    get canUsePosition() {
        return this._canUsePosition;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        if (this._canUseSpeed) {
            this._speed = MathUtil.clamp(value, -100, 100);
        }
    }
}

const createDevice = function (ioType) {
    switch (ioType) {
        case IOType.SIMPLE_MEDIUM_LINEAR_MOTOR:
        case IOType.TRAIN_MOTOR:
        case IOType.LIGHT:
        case IOType.MEDIUM_LINEAR_MOTOR:
        case IOType.MOVE_HUB_MOTOR:
        case IOType.DUPLO_TRAIN_BASE_MOTOR:
        case IOType.TECHNIC_LARGE_MOTOR:
        case IOType.TECHNIC_XL_MOTOR:
        case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
        case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
            return new Motor(ioType);

        default:
            return new GenericDevice(ioType);
    }
}

module.exports.GenericDevice = GenericDevice;
module.exports.Motor = Motor;
module.exports.createDevice = createDevice;
