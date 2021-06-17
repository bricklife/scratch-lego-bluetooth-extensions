import React from 'react';
import {FormattedMessage} from 'react-intl';

import poweredupIconURL from './poweredup.png';
import poweredupInsetIconURL from './poweredup-small.svg';
import poweredupConnectionIconURL from './poweredup-illustration.svg';
import poweredupConnectionSmallIconURL from './poweredup-small.svg';
import poweredupConnectionTipIconURL from './poweredup-button-illustration.svg';

const entry = {
    name: 'LEGO Powered Up',
    extensionId: 'poweredup',
    collaborator: 'bricklife',
    iconURL: poweredupIconURL,
    insetIconURL: poweredupInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build with motors and sensors."
            description="Description for the 'LEGO Powered Up' extension"
            id="gui.extension.poweredup.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: poweredupConnectionIconURL,
    connectionSmallIconURL: poweredupConnectionSmallIconURL,
    connectionTipIconURL: poweredupConnectionTipIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to their hub."
            id="gui.extension.poweredup.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
