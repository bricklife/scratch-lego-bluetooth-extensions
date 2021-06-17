import React from 'react';
import {FormattedMessage} from 'react-intl';

import legomarioIconURL from './legomario.png';
import legomarioInsetIconURL from './legomario-small.svg';
import legomarioConnectionIconURL from './legomario-illustration.svg';
import legomarioConnectionSmallIconURL from './legomario-small.svg';
import legomarioConnectionTipIconURL from './legomario-button-illustration.svg';

const entry = {
    name: 'LEGO Mario',
    extensionId: 'legomario',
    collaborator: 'bricklife',
    iconURL: legomarioIconURL,
    insetIconURL: legomarioInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Play with LEGO Mario."
            description="Description for the 'LEGO Mario' extension"
            id="gui.extension.legomario.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: legomarioConnectionIconURL,
    connectionSmallIconURL: legomarioConnectionSmallIconURL,
    connectionTipIconURL: legomarioConnectionTipIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to their LEGO Mario."
            id="gui.extension.legomario.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
