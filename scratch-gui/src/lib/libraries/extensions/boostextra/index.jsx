import React from 'react';
import {FormattedMessage} from 'react-intl';

import boostIconURL from './boost.png';
import boostInsetIconURL from './boost-small.svg';
import boostConnectionIconURL from './boost-illustration.svg';
import boostConnectionSmallIconURL from './boost-small.svg';
import boostConnectionTipIconURL from './boost-button-illustration.svg';

const entry = {
    name: 'LEGO BOOST (with distance)',
    extensionId: 'boostextra',
    collaborator: 'LEGO',
    iconURL: boostIconURL,
    insetIconURL: boostInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Bring robotic creations to life."
            description="Description for the 'LEGO BOOST' extension"
            id="gui.extension.boost.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: boostConnectionIconURL,
    connectionSmallIconURL: boostConnectionSmallIconURL,
    connectionTipIconURL: boostConnectionTipIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to their BOOST."
            id="gui.extension.boost.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
