const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,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';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/controlplus.mjs';

class Scratch3ControlPlusBlocks extends BleBaseBlocks {

    static get EXTENSION_ID() {
        return 'controlplus';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        super(new Hub(runtime, Scratch3ControlPlusBlocks.EXTENSION_ID, 0x80));

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        this.setupTranslations(formatMessage);

        return {
            id: Scratch3ControlPlusBlocks.EXTENSION_ID,
            name: 'CONTROL+',
            extensionURL: Scratch3ControlPlusBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: this.getBlocks(formatMessage),
            menus: this.getMenus(formatMessage)
        };
    }
}

exports.blockClass = Scratch3ControlPlusBlocks;
module.exports = Scratch3ControlPlusBlocks;
