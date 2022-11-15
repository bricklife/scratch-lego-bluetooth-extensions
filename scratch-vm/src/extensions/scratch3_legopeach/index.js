const MarioBaseBlocks = require('./lib/mario-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,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';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/legopeach.mjs';

class Scratch3LegoPeachBlocks extends MarioBaseBlocks {

    static get EXTENSION_ID() {
        return 'legopeach';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        super(new Hub(runtime, Scratch3LegoPeachBlocks.EXTENSION_ID, 0x45));

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        this.setupTranslations(formatMessage);

        return {
            id: Scratch3LegoPeachBlocks.EXTENSION_ID,
            name: 'LEGO Peach',
            extensionURL: Scratch3LegoPeachBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: this.getBlocks(formatMessage),
            menus: this.getMenus(formatMessage)
        };
    }
}

exports.blockClass = Scratch3LegoPeachBlocks;
module.exports = Scratch3LegoPeachBlocks;
