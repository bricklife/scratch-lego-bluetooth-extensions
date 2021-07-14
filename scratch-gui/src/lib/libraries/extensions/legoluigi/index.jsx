import React from 'react';
import {FormattedMessage} from 'react-intl';

import legoluigiIconURL from './legoluigi.png';
import legoluigiInsetIconURL from './legoluigi-small.svg';
import legoluigiConnectionIconURL from './legoluigi-illustration.svg';
import legoluigiConnectionSmallIconURL from './legoluigi-small.svg';
import legoluigiConnectionTipIconURL from './legoluigi-button-illustration.svg';

const entry = {
    name: 'LEGO Luigi',
    extensionId: 'legoluigi',
    collaborator: 'bricklife',
    iconURL: legoluigiIconURL,
    insetIconURL: legoluigiInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Know what he is doing."
            id="gui.extension.legoluigi.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: legoluigiConnectionIconURL,
    connectionSmallIconURL: legoluigiConnectionSmallIconURL,
    connectionTipIconURL: legoluigiConnectionTipIconURL,
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
