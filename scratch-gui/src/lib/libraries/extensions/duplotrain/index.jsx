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
            id="gui.extension.boost.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/boost',
    translationMap: {
        'en': {
            'gui.extension.duplotrain.description': 'Build and control your train.'
        },
        'ja': {
            'gui.extension.duplotrain.description': 'レゴ デュプロの機関車を動かそう。'
        },
        'ja-Hira': {
            'gui.extension.duplotrain.description': 'レゴ デュプロのできかんしゃをうごかそう。'
        }
    }
};

export {entry}; // loadable-extension needs this line.
export default entry;
