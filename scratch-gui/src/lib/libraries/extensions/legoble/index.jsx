import React from 'react';
import {FormattedMessage} from 'react-intl';

import legobleIconURL from './legoble.png';
import legobleInsetIconURL from './legoble-small.svg';
import legobleConnectionIconURL from './legoble-illustration.svg';
import legobleConnectionSmallIconURL from './legoble-small.svg';

const entry = {
    name: 'LEGO BLE Device',
    extensionId: 'legoble',
    collaborator: 'bricklife',
    iconURL: legobleIconURL,
    insetIconURL: legobleInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="General and advanced extension for LEGO Wireless Protocol."
            id="gui.extension.legoble.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: legobleConnectionIconURL,
    connectionSmallIconURL: legobleConnectionSmallIconURL,
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
