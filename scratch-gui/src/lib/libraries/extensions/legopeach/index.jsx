import React from 'react';
import {FormattedMessage} from 'react-intl';

import legopeachIconURL from './legopeach.png';
import legopeachInsetIconURL from './legopeach-small.svg';
import legopeachConnectionIconURL from './legopeach-illustration.svg';
import legopeachConnectionSmallIconURL from './legopeach-small.svg';
import legopeachConnectionTipIconURL from './legopeach-button-illustration.svg';

const entry = {
    name: 'LEGO Peach',
    extensionId: 'legopeach',
    collaborator: 'bricklife',
    iconURL: legopeachIconURL,
    insetIconURL: legopeachInsetIconURL,
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
    connectionIconURL: legopeachConnectionIconURL,
    connectionSmallIconURL: legopeachConnectionSmallIconURL,
    connectionTipIconURL: legopeachConnectionTipIconURL,
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
