import React from 'react';
import {FormattedMessage} from 'react-intl';

import spikeprimeIconURL from './spikeprime.png';
import spikeprimeInsetIconURL from './spikeprime-small.svg';
import spikeprimeConnectionIconURL from './spikeprime-illustration.svg';
import spikeprimeConnectionSmallIconURL from './spikeprime-small.svg';

const entry = {
    name: 'LEGO Education SPIKE Prime (Legacy)',
    extensionId: 'spikeprime',
    collaborator: 'bricklife',
    iconURL: spikeprimeIconURL,
    insetIconURL: spikeprimeInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build interactive robots and more. (doesn't work on Windows)"
            id="gui.extension.spikeprime.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: spikeprimeConnectionIconURL,
    connectionSmallIconURL: spikeprimeConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            id="gui.extension.boost.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
