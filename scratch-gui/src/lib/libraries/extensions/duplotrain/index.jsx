import React from 'react';
import {FormattedMessage} from 'react-intl';

import duplotrainIconURL from './duplotrain.png';
import duplotrainInsetIconURL from './duplotrain-small.svg';
import duplotrainConnectionIconURL from './duplotrain-illustration.svg';
import duplotrainConnectionSmallIconURL from './duplotrain-small.svg';
import duplotrainConnectionTipIconURL from './duplotrain-button-illustration.svg';

const entry = {
    name: 'LEGO DUPLO Train',
    extensionId: 'duplotrain',
    extensionURL: 'https://bricklife.com/scratch-gui/xcratch/duplotrain.mjs',
    collaborator: 'bricklife',
    iconURL: duplotrainIconURL,
    insetIconURL: duplotrainInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build and control your train."
            id="gui.extension.duplotrain.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: duplotrainConnectionIconURL,
    connectionSmallIconURL: duplotrainConnectionSmallIconURL,
    connectionTipIconURL: duplotrainConnectionTipIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            id="gui.extension.duplotrain.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost'
};

export {entry}; // loadable-extension needs this line.
export default entry;
