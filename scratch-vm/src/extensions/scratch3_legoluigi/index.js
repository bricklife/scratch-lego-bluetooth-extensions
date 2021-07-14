const MarioBaseBlocks = require('./lib/mario-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,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';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/legoluigi.mjs';

class Scratch3LegoLuigiBlocks extends MarioBaseBlocks {

    static get EXTENSION_ID() {
        return 'legoluigi';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        super(new Hub(runtime, Scratch3LegoLuigiBlocks.EXTENSION_ID, 0x44));

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        this.setupTranslations(formatMessage);

        return {
            id: Scratch3LegoLuigiBlocks.EXTENSION_ID,
            name: 'LEGO Luigi',
            extensionURL: Scratch3LegoLuigiBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: this.getBlocks(formatMessage),
            menus: this.getMenus(formatMessage)
        };
    }
}

exports.blockClass = Scratch3LegoLuigiBlocks;
module.exports = Scratch3LegoLuigiBlocks;
