import React from 'react';
import {FormattedMessage} from 'react-intl';

import legoremoteIconURL from './legoremote.png';
import legoremoteInsetIconURL from './legoremote-small.svg';
import legoremoteConnectionIconURL from './legoremote-illustration.svg';
import legoremoteConnectionSmallIconURL from './legoremote-small.svg';
import legoremoteConnectionTipIconURL from './legoremote-button-illustration.svg';

const entry = {
    name: 'LEGO Powered UP Remote Control',
    extensionId: 'legoremote',
    collaborator: 'bricklife',
    iconURL: legoremoteIconURL,
    insetIconURL: legoremoteInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Control by remote control."
            id="gui.extension.legoremote.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: legoremoteConnectionIconURL,
    connectionSmallIconURL: legoremoteConnectionSmallIconURL,
    connectionTipIconURL: legoremoteConnectionTipIconURL,
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
