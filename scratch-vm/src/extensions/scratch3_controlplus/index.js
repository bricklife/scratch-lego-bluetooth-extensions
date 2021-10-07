const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAD6UlEQVR4Ae2aPWgUURDHZy93XhIjSTaFBILaWFhFK9FCghZaCnbaWFlYWEYEixSCaGlhLYIEEcEyIEIUPxpFIqKghRASosjlEvN5l7tdd3bzlr3lZvdld72Lyf8V997Omzcz77eze8PdI0IDARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAgZ1PwIja4tidp0M1q3KXyB5x9AajdHfB3ByRMZnPFUfHrl+YUfsVATK8ul2Zsm3bVMroHYSGMd9hFIcVxLwEZTPzzANDAzRy4gj17C02Vb03UaI339Yo39VLXeZBWi/P0MbqPB091ElXTvfTQE9H03XPX36m7z9+UZz9pos1hJJ9SR5ncnmlQpPvvtL0TMms2fxU0kVek5MXuo9tJDxe+2W24ppgeLmOAtUrS+51FDxWmP1ZdvWibo6rkPBDsi/J49xwAnGsXvPY8FjMQGfOfedJmecZIiqvWO6Q4XGz6htuL2WeO+l8rK5V3aGyf//BCzXVtL96+Ywr19UL21dGJbmaj+pVrI6O/30QkYFRpjCnCERloNJpaX9yuL/B39sp71FvEDoXunrhdVlfIwNTEm3IwFDdtyXTi9MftqSvlPlbUb3YWSZlXPjdp6sXXqf8ZtX7AFXd5xTNLa37uJT5n5sPMFz3PXzyWmtfj68NaelJSuE6MGmdJtn/1/LAO1Cv7ss6oHAdqB7nsDxrv1nZ8zPQMdhQ96m6KytHYTuS/TR1WthHK64DGdgKdzvPBwCmvKcAmBKgcfP2IzvOhtnXQ+fPHaPOzj1xqpHz6+tVejbxkeYXliP1kkxK71TJVlaxaGUgb5g3zk6TtqwCTuo/uC7LWPwMLM+9Cvrwx7lcgfYNDFMu3+3L0gys2iotlabIsrxfbdLY4rX9g6cSm+BY1L6k/UvGld/YDOSN/il9InaWtmUNL008KpY0NnhtsA4UbdlWlRZ/vxfnt8PEVjMoq5hjMzArRzvVjp+B6plu151UgFUc6rpVfVK/yMCUd8j/W1PVg9slA9sdh8RVZeqtG5dcdshAiZSmHAA1QUlqACiR0ZQDoCYoSQ0AJTKacgDUBCWpAaBERlMOgJqgJDUAlMhoygFQE5SkBoASGU15EKBzBtg5cZlrfhJV015qNavu/W3Q7jiabSQQk8uKdQIAjUkWdPcdbivEWnWBw2h7HG4QgQ+Gx2y85rHisf97IJ8+dw6Vny0UTbN3//FNxfZ1Thy0HeIIE9g8ZD6q5H4G8qlzPn3unEMfdyb9FFWK6JmJMR48oQ8mIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACILBbCPwFpqc7sJw6T5QAAAAASUVORK5CYII=';

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
