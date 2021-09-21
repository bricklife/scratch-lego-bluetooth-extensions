const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAByElEQVR4Ae3YP07DMBiG8QS4ACdBYmQtlwCmzhwAkICFSvzZmZkoCxyBlZ2TcIOEtJKrqlL6fGlqCdonS9y88WfnV0eWUhQeCiiggAIKKKCAAgoooIACCiiggAIKKKCAAgoooIACCiiQV6DsUv728W1QVfWwLIvduiw/Rhcn75P+m3o9YrMXuSndU9XVU9M+rOuiaOSPm/YUcFOvp+dedsYVeH3/2nBt7zG6OltqtLO9NOt58vArfHd5up4RF6rcPIynV3LVXxgu/DPNizqEASeFIkUTRJd7aZJ/OfcV7vnvdFqBaayjg/3UnJ2/vn9m7flGl3vn+/2X9tIdZvIQ7sLuwlkXc/gVPh8Oskzk+eVzWjdX/VUnneZF/d1ESAhyAQGIYgFJCHIBAYhiAUkIcgEBiGIBSQhyAQGIYgFJCHIBAYhiAUkIcgEBiGIBSQhyAQGIYgFJCPLw98Do9zEYrzXOXb914J6BK7AnYHgF5vpinFZervqr+qR5UX9XIAlBLiAAUSwgCUEuIABRLCAJQR7ehaO7EozXGueu3zpwz8AV2BPQ7goooIACCiiggAIKKKCAAgoooIACCiiggAIKKKCAAgookFvgF1zdypav+pVRAAAAAElFTkSuQmCC';

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
