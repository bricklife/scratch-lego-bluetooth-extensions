import React from 'react';
import {FormattedMessage} from 'react-intl';

import controlplusIconURL from './controlplus.png';
import controlplusInsetIconURL from './controlplus-small.svg';
import controlplusConnectionIconURL from './controlplus-illustration.svg';
import controlplusConnectionSmallIconURL from './controlplus-small.svg';
import controlplusConnectionTipIconURL from './controlplus-button-illustration.svg';

const entry = {
    name: 'LEGO Technic CONTROL+',
    extensionId: 'controlplus',
    collaborator: 'bricklife',
    iconURL: controlplusIconURL,
    insetIconURL: controlplusInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build with motors and sensors."
            id="gui.extension.controlplus.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: controlplusConnectionIconURL,
    connectionSmallIconURL: controlplusConnectionSmallIconURL,
    connectionTipIconURL: controlplusConnectionTipIconURL,
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
