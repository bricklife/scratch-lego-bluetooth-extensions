const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAABg0lEQVR4Ae3ZQUrDQBgF4CpewJO49xZdCXqRCgoFC3oRBVfeontP4hGUFlOy+GnntSZI+Lrp8Po6mfmYkEVmMx8CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmLLA2aHNPTy/fh/qTPn31f3dXqPzKW9+jL1dtF7kaXHbWo16jy9v2/5Q80eL6ZW7dfWictgMWP57oLBl8Sn4EHNutu8WPvEQ/MsT2O3p+uqyG+6+159fu/Exg7+ec+8TZrNAT2FP4WMOavN/mm/h5fy9edKkuPy42daHmj9ZS7/braufVWMPkUolyAAGWFUVYKUSZAADrKoKsFIJMoABVlUFWKkEGcAAq6oCrFSCDGCAVVUBVipBBjDAqqoAK5UgAxhgVVWAlUqQAQywqirASiXIAAZYVRVgpRJkAAOsqgqwUgkygAFWVQVYqQRZ+3vh3/e3wdxRtfU9bDTpCGUncARklyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4BSBHwsjI1nfUaReAAAAAElFTkSuQmCC';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/spikeessential.mjs';

class Scratch3SpikeEssentialBlocks extends BleBaseBlocks {

    static get EXTENSION_ID() {
        return 'spikeessential';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        super(new Hub(runtime, Scratch3SpikeEssentialBlocks.EXTENSION_ID, 0x83));

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    get externalPorts() {
        return ['A', 'B'];
    }

    get multipleExternalPorts() {
        return ['A', 'B', 'A+B'];
    }

    getInfo() {
        this.setupTranslations(formatMessage);

        return {
            id: Scratch3SpikeEssentialBlocks.EXTENSION_ID,
            name: 'SPIKE Essential',
            extensionURL: Scratch3SpikeEssentialBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: this.getBlocks(formatMessage),
            menus: this.getMenus(formatMessage)
        };
    }

    getHubTilt(args) {
        const value = super.getHubTilt(args);
        return value != null ? value / 10 : 0;
    }
}

exports.blockClass = Scratch3SpikeEssentialBlocks;
module.exports = Scratch3SpikeEssentialBlocks;
