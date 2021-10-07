const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAC2ElEQVR4Ae3avW4TQRDA8TuDJcvCjQtLuEQiTXqgtngCoEwHCGh4AUv+kvwMgEQ63oIQWa6Agi5l6DAP4Ciy5eKYOXGR45Vud/DZ6OB/Rc7end3b+d36EjkTRRwIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIILBbgTh0+iRJ4tFo9EzOT2XMoZxvhY4tQ1wcxxeyzjM5H/d6vfdyTkLWHQQ4Ho9vr1arD4LWCZm07DGCd1qtVo+63e5PXy43fQG684bDYYrXaDSSe/cfxO12O6rX676hpeq/vLyMZrNZ9PXL52Q+n3d+b5iHvp14w5dlpVJ5LoivFe/R4ydxq9WK5O74hpWuX3NqNpvR3YOD+Pv5ebJcLu9Mp9Mfk8nkW14ylbxO7RM8feZFuvNqtZq+/KcPzVFz1SSz3PMS9gLK4EOdQD+2/8uxlmuae17eIc/A9Lft5jPv3ds3efOWru/Fy1dXa85ylR3o/UsjZAdeTcwLVwBA18TUAqCJyw0G0DUxtQBo4nKDAXRNTC0AmrjcYABdE1MLgCYuNxhA18TUAqCJyw0G0DUxtQBo4nKDAXRNTC0AmrjcYABdE1MLgCYuN9j7jbQ7JL9l/Zvd/Mi/01v0N+nswC3vI4AAbimw5fDCn4Gb6yn6mbM5v+/9rp/JfIR9d8DT792BUhtyof8f1dqR7P+lOmfIndUxeugcg8Ggkb7Z0w+53ryIdfuWG7IDz3QSLbyxHmtj0jms47eM38u6vYCye441Ea1aWiwWwTlprI7RAdkcwYMLCMyuuet1e+sD5WOg5W0ncu6ElLdtlIlJHvFpv9/3lokVYHZtin2tO+QZmEiB5ZHWy2nd3KeTj9cWmvMmxdNCRXkRVO2ZM5e5S6+5j3V7d2C2cr2jISW+svA/KpXNrlP0uazrLtqB+RBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBAor8Av1TQfBCyGec4AAAAASUVORK5CYII=';

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
        this.setupTranslations(formatMessage);

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
