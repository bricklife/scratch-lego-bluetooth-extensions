const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAD5ElEQVR4Ae2aQWsTURDHZ9OEmGppmx6kItaLeCyCoHiQehCvgjf17EHvFcFDD4LozYMfQFAKguLZXoqoeNBDPAhSkCq1RaRJazUxbZJ1Z7ezbJbM5jW7TWr7f4e83XnzZub9dvZlmj4iNBAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARDY/QSsqCVO3Xt2uNao3ieyJxy90SjdPTC2RGTNplPZyamblxZkvSpAhle3qwXbtvOijN5BaFnFPis7LhDTGpTNzMuPHRqkidNH6UB/pqXqg5kKvZmrUTo3SLn8GP0tLdBGuUgnjqTp2rl9NLK/9TN6+foLzc0XqZ39lk4NhJp9Td7O5O/yBs2+m6evi6v5ms1vJV3mOSl9ovvaRsLjuZ8W664Jhpfqy1C9uubeR8Fjhe8/PL2oh+Ma6vBDs6/J27nhBOJYveax4Ws1A50xd8/TMs8zRFT6Y7uXDI9bo77h9lrmuYPOR7ni6Yn9h4/fy1DL/sbVk67cVC9sX4xqchmP6iVWR8f/PojIwChTGBMCURkoOl3tz4wPN/l7Wyg13cuNqZ7ob1ePDIxJtikDQ3XflkyvfvuwJX1R5m9F2dhZpmVceO8z1QvPE79J9T5AqfucormrdR+XMv9z8wGG675HzwtG63p6fcBIT1MK14Gd1mma/e2WB/ZAs7ov6YDCdaC8zmF50n6TsudnoGOwqe6TuispR2E7mv04dVrYRzfuAxnYDXe7zwcAxnymABgToHX77hPvj9kIQ/mhHF08f5xy2eCWGTFBGapUa/Ri5jMVVyqKRudibU/VLCYVi1EG8oJ54ey005ZUwJ36D85LMhY/A0tLr4I+/OtUKkMDI+OUSvf7sjgXjVqZ1pYL1Gh4v8bEscVzh0fPdmyCY5F1aevXjIvfthnIC/21/JHYWdyWNLw48UgscWzwXKNNzW6s0+rP6N/r4gYSd/5WMyiuP5nfNgNFEX1rAn4Gyjvdqycp4Ukcct+tvlO/yMCYT8j/l5nUgzslA3sdh8ZVMvXOrSsuO2SgRspQDoCGoDQ1ANTIGMoB0BCUpgaAGhlDOQAagtLUAFAjYygHQENQmhoAamQM5QBoCEpTA0CNjKE8CNA5A+ycuExlDaduj1qjvu4a7nUcrVYXiMllxToBgNYsC/qHjvUUYm19hcPoeRxuEIEPhsdsvOax4mv/90A+fe4cKr+QyebzgwdPbSr2rnPioJ0QR5jA5iHzSZH7Gcinzvn0uXMOfdoZ9FNUFNEzE2s6eEIfTEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEBgrxD4B+c5O3xc5O5NAAAAAElFTkSuQmCC';

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
