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
    extensionURL: 'https://bricklife.com/scratch-gui/xcratch/legomario.mjs',
    collaborator: 'bricklife',
    iconURL: legomarioIconURL,
    insetIconURL: legomarioInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Know what he is doing."
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
            id="gui.extension.legomario.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
