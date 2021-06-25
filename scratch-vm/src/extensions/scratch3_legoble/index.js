const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');
const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAACn0lEQVR4Ae3aT07bQBTHcdug7NoVWVQp616AVRFVlIt0xwnKplXzb9FNj4E4B5EquuIWNGKRG0RVzHsWoweVPcbPwYL0GynKxJ7fZN7HE0eKJkl4IIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIFAjkNacL07P5/OTzWZzJm+O8jx/95TMa+2TpumtzP06y7Kf4/H4V10de3UdptPpV0E7l+cH6fumrv8OnNcatdbPw+Hw72KxiCJGV6DgfZKBFnI1ksPD92m/3096vd4OGFWXsF6vk9Vqldzc/MnlW5dL7cPYSsyqhyrOfJGVlyreYDDYeTytWBeI1qo1S+3Z/a2rkqkO8EiTuvL+t8eDmguDqvqjgHIFih+MXf/aluGEmoNBWR89FgWsCnHcBPat2ax1dfW7WeCF9z4+/uiaISvQxWYhAM3C1QLQxWYhAM3C1QLQxWYhAM3C1QLQxWYhAM3C1QLQxWYhAM3C1QLQxWYhAM3C1QLQxWYhAM3C1QLQxWYhAM3C1QLQxWYh9z/SNsTjlvef3cejPN+7bf+Tzgpsea0ABLClQMs4K7Al4NZ/RMrms+0bd9lnlB3r4gfNDdjF5MpQ2h7b9rzdgJ5CZrNZdDeYZ8yyzGQyycuOP8ex6D3wfrNholu+vI+QDWN5x2mSC58VPrtJNvQN2TBWOP7vaxRQOl9rQPfLeR8PssVY3nEa5jqbdxRQt7nKFdjoZsPlctloJeoV1IxmdQwdqyGCu3uX8669J8l965ts8ZrrZkNPRYonue+y2/WHJ+/NdDXv2j3Sukd4NBpdSiEHgvFWXp+0T1r63spTtwefyk39wgvhzb3WeXvrJYcAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIPCCBe4A1CzCO9yATG4AAAAASUVORK5CYII=';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/legoble.mjs';

class Scratch3LegoBleBlocks extends BleBaseBlocks {

    static get EXTENSION_ID() {
        return 'legoble';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        super(new Hub(runtime, Scratch3LegoBleBlocks.EXTENSION_ID));

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    get hasAdvancedBlocks() {
        return true;
    }

    getInfo() {
        setupTranslations(formatMessage);

        return {
            id: Scratch3LegoBleBlocks.EXTENSION_ID,
            name: 'LEGO BLE',
            extensionURL: Scratch3LegoBleBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: this.getBlocks(formatMessage),
            menus: this.getMenus(formatMessage)
        };
    }
}

exports.blockClass = Scratch3LegoBleBlocks;
module.exports = Scratch3LegoBleBlocks;
