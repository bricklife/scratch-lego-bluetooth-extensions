import React from 'react';
import {FormattedMessage} from 'react-intl';

import spikeessentialIconURL from './spikeessential.png';
import spikeessentialInsetIconURL from './spikeessential-small.svg';
import spikeessentialConnectionIconURL from './spikeessential-illustration.svg';
import spikeessentialConnectionSmallIconURL from './spikeessential-small.svg';
import spikeessentialConnectionTipIconURL from './spikeessential-button-illustration.svg';

const entry = {
    name: 'LEGO Education SPIKE Essential',
    extensionId: 'spikeessential',
    collaborator: 'bricklife',
    iconURL: spikeessentialIconURL,
    insetIconURL: spikeessentialInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build with motors and sensors."
            id="gui.extension.spikeessential.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: spikeessentialConnectionIconURL,
    connectionSmallIconURL: spikeessentialConnectionSmallIconURL,
    connectionTipIconURL: spikeessentialConnectionTipIconURL,
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
