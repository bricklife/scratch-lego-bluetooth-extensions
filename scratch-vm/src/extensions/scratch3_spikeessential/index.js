const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAABbklEQVR4Ae3ZsUkEQRiGYRUbsBJzuzAStBEFhQMFbUTByC7MrcQSFMU9jHzH1b3geC65gW/2n38eZplgd3b8CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCbBXZrc5e39281Z5vzm4uzH432tnnzm9jb/ugi1+eno1M3Mu/q7uFznaX6murXZoYBvxcaKf7bjS1R83vPS429wn+UnXUCpzWPDg+m4fr/+eV1PZ4zWKLmnD5Gn/nxhvko4hZ2C48eplnzhl/h1fHjrAWWemj1dPJZeqm+pvrVv0ukhCIHGEAVAyyhyAEGUMUASyhygAFUMcASihxgAFUMsIQiBxhAFQMsocgBBlDFAEsocoABVDHAEoocYABVDLCEIgcYQBUDLKHIAQZQxQBLKHKAAVQxwBKKfPy78Nd32Ki38Xj0++1SjTmBS8mqS4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAPwm8A+XxI1mXdQRsAAAAAElFTkSuQmCC';

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
