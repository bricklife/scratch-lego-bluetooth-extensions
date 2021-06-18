import React from 'react';
import {FormattedMessage} from 'react-intl';

import legobleIconURL from './legoble.png';
import legobleInsetIconURL from './legoble-small.svg';
import legobleConnectionIconURL from './legoble-illustration.svg';
import legobleConnectionSmallIconURL from './legoble-small.svg';
import legobleConnectionTipIconURL from './legoble-button-illustration.svg';

const entry = {
    name: 'LEGO BLE Device',
    extensionId: 'legoble',
    collaborator: 'bricklife',
    iconURL: legobleIconURL,
    insetIconURL: legobleInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build with motors and sensors."
            id="gui.extension.legoble.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: legobleConnectionIconURL,
    connectionSmallIconURL: legobleConnectionSmallIconURL,
    connectionTipIconURL: legobleConnectionTipIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            id="gui.extension.legoble.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
