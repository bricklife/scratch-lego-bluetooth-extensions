const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEGCSkSKniD0QAAAT1JREFUWMPtlj1OxDAQRp9HFNxguQGizoqGNgUVR0FiUyMuwG7uQkWRAiHRoOwBuAE00CJRDAW7QgQcEiexDfInRS7sGT3NXwaSkpL+toztQnNmwCnw2tnbDphrJ4Yb4Nbi0mJV8aQ5z8Clh0Bd2AClJYKYiiVQeABU24W0RHALuQIWoWpQWovjE7IMBSm/VnBgSOnUZgEhpfMsCAQpfR43IIvoAEN0t7gY+Uy3uBr6SrcMMW6kuyBWab45T8zZ5rfV9ztv2T9GWIkq0GMwV1oePSpvL6z6+rg/MNMBwseadfig3O2ZMqvVAMvgNfgtCvuGrFbWczNaTcrY9bief4FcRAfYgBw8J2Wqzm5AFtEB/pDuIjrAMSAnBxwK6QVwSHd7A3Ttbq+ALpDeAS0jaDfKLSirdXvOSEpK+qd6B+rNkHpCz2WwAAAAAElFTkSuQmCC';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI =  ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEGCSwjBtF3rgAABOBJREFUeNrtnD1IY1kUx3/mw0CITiM7ziKD2AyCaK1iRNidnel0xFqELQVhUQluI0jqFUFQwWIbUVFsFBsLp4ggNuroKCq4yrJ+IDPoiJoPc7fwJTu+JC8v5mXNS+4PTpGQ897Nn3vvued+gUQiMTEFWVCGQsWcQA1QDbwGXirfAdwAZ8AxsAlsKN8FFMs7AV8B7cB7oAz4AXCl+Ixr4Bz4G1gE/gROcrm2lwO/AtuAyJBtK+8ozyXh3gBrwF0GhVPbnfLON2YWrkFpWuKZbVEpi2l4AcxngXBqm1fKltX8BnzNQvEi9lUpY9ZRDExlsXBqm1LKnBW8BL6YSLyIfVHK/qy8BcImFC9iYeU/PAsfTCyc2j5I8Uwk4tscFC9iKTfngicEjJMsmYTIBELJ08/0OlhSHKrs5LB4kQq1k6khzlQON91440TDMwyRZ2ZYxvIiy9OzTKZ9huTOC3koXsQWjJiSEnluaU2FLUoBWUxnJllIQzx1ZntNChe1tacsAN1J4R6tsZSnkon8DDiQRHAAP6XisC1rXdwlU12TCa+Af2Sli8uPqBbv4zXhdqlTQtr19IHvpU4JidHGpvpcyMNelYR0dnZSUlIS/RwMBvF6vTgcDnp7e7FarUlLsbu7y/T0NB6Ph8LCQl0lX11dZWlpie7ubhyO5PHNYrGwvLyMz+ejv78fv9+f1MdutzM6Osrx8XGin5QpGiXc0OQCvml1pjs7O+J7bm9vBSCKiopEIBAQepibmxN2u11cX18LvQwNDQmn0ykuLy91+3i9XlFcXCxSob6+XiuQfEO1CUrdhJ2kvksqn3Dx35a7uALWSI2SUqMlYPX/UYJIP2mz2XT7WCyWJ/ukNKdfkHTFoloriLw2Uqi1tTX6+vqw2+3RwlksFk5PTwmFQjQ3N2Oz2RBC0NPTQ2NjY9T3/v6erq4ujo6OADg8PMTv99Pa2orNZiMcDuPxeGhoeDzb1NHRwcXFBQUFBezt7XFzc0NLSwuhUIjb21vGxsaoqKh45NPU1ITL5cJqtbK9vZ3sb2lqNJlsRJ5KEFlZWRF1dXXC7XYLt9stKisrEz53YmLikW8wGBRVVVWaZZmcnIwJAmVlZZo+6+vrMT4pZiSTWjXQaWQNrK2txefzRT/PzMzQ1tZm9j7QqWcyISOEQqGciyhqAW9kkE3KjZaAZ5l8s96sI8s50+oDj41809bWFoODg9Ghx8HBQS4IeKwl4KaRbzo6OmJ8fDzXmvCmVhPeMPJNOgalZmQjWRC5lnEiIdfqIKJuwgEejk8lnFAYHh6Omc4CCAQCDAwMRNO0SCagl9nZWfb393kY10I4HOb8/FzTZ2Zmht3d3Ucp4tXVlabPyMgIpaWlTxXwHB1n8z4i1z8S2cdk40BIYyU+D4jRRi4qpYauRaUT4LPUKobPxDlOmygX/kPqlZ4m5citHWlt7fgL+CQrXZRPiiYpIbe3pbm9LRK25QbLNJBbfA047T6fx+LNG9GBymMOGlh1COgHgsAveRZ5fweWjXygPOqVJsWY82j/U64C0H3YUB53fUxGj7uiPPhdDvd778jwymQEeeRfivi84kWQ154YgLx4x6Ahjrz6yQDk5WMG5c7ZeMp9ARNcf6eeCpMXMBqAvALUIMrJwUto5TXIJhXwe0x9EbdEIjE1/wIm53WPlpoHFgAAAABJRU5ErkJggg==';

/**
 * The url of the ifttt server.
 * @type {string}
 */
const iftttServerURL = 'https://maker.ifttt.com/';

/**
 * Class for the ifttt.com webhooks block in Scratch 3.0.
 * @constructor
 */
class Scratch3IFTTTWebhooks {
    constructor (runtime) {
        this.runtime = runtime;
        this.key = '';
    }

    getInfo () {
        return {
            id: 'iftttWebhooks',
            name: formatMessage({
                id: 'iftttWebhooks.categoryName',
                default: 'IFTTT Webhooks',
                description: 'Name of extension that adds IFTTT Webhook blocks'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'setIftttKey',
                    blockType: BlockType.COMMAND,
                    text: 'IFTTT key:[KEY]',
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        }
                    }
                },
                {
                    opcode: 'getIfttt',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'iftttwebhooks.getIfttt',
                        default: 'Trigger [EVENT]',
                        description: 'Trigger [EVENT]'
                    }),
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultEvent',
                                default: 'eventName',
                                description: 'eventName: the default event name'
                            })
                        }
                    }
                },
                {
                    opcode: 'getIfttt1',
                    text: formatMessage({
                        blockType: BlockType.COMMAND,
                        id: 'iftttwebhooks.getIfttt1',
                        default: 'Trigger [EVENT] with [VALUE1]',
                        description: 'Trigger [EVENT] with [VALUE1]'
                    }),
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultEvent',
                                default: 'eventName',
                                description: 'eventName: the default event name'
                            })
                        },
                        VALUE1: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultValue1',
                                default: 'value1',
                                description: 'the default value1'
                            })
                        }
                    }
                },
                {
                    opcode: 'getIfttt2',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'iftttwebhooks.getIfttt2',
                        default: 'Trigger [EVENT] with [VALUE1] and [VALUE2]',
                        description: 'Trigger [EVENT] with [VALUE1] and [VALUE2]'
                    }),
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultEvent',
                                default: 'eventName',
                                description: 'eventName: the default event name'
                            })
                        },
                        VALUE1: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultValue1',
                                default: 'value1',
                                description: 'the default value1'
                            })
                        },
                        VALUE2: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultValue2',
                                default: 'value2',
                                description: 'the default value2'
                            })
                        }
                    }
                },
                {
                    opcode: 'getIfttt3',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'iftttwebhooks.getIfttt3',
                        default: 'Trigger [EVENT] with [VALUE1], [VALUE2] and [VALUE3]',
                        description: 'Trigger [EVENT] with [VALUE1], [VALUE2] and [VALUE3]'
                    }),
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultEvent',
                                default: 'eventName',
                                description: 'eventName: the default event name'
                            })
                        },
                        VALUE1: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultValue1',
                                default: 'value1',
                                description: 'the default value1'
                            })
                        },
                        VALUE2: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultValue2',
                                default: 'value2',
                                description: 'the default value2'
                            })
                        },
                        VALUE3: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'iftttwebhooks.defaultValue3',
                                default: 'value3',
                                description: 'the default value3'
                            })
                        }
                    }
                }
            ],
            menus: {
            }
        };
    }

    getIfttt(args) {
        var json = { };

        if (args.VALUE1) {
            json.VALUE1 = Cast.toString(args.VALUE1);
        }

        if (args.VALUE2) {
            json.VALUE2 = Cast.toString(args.VALUE2);
        }

        if (args.VALUE3) {
            json.VALUE3 = Cast.toString(args.VALUE3);
        }

        let urlBase = iftttServerURL + 'trigger/' + Cast.toString(args.EVENT) + '/with/key/' + Cast.toString(this.key);

        return fetch(urlBase, {
            method: 'POST',
            body: JSON.stringify(json),
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(_ => { return 'Ok'; })
        .catch(_ => { return 'Fail'; });
    }

    getIfttt1(args) {
        return this.getIfttt(args);
    }

    getIfttt2(args) {
        return this.getIfttt(args);
    }

    getIfttt3(args) {
        return this.getIfttt(args);
    }

    setIftttKey (args) {
        this.key = Cast.toString(args.KEY);
    }
}

module.exports = Scratch3IFTTTWebhooks;
