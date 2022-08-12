import React from 'react';
import {FormattedMessage} from 'react-intl';

import iftttWebhooksIconURL from './iftttWebhooks.png';
import iftttWebhooksInsetIconURL from './iftttWebhooks-small.png';

const entry = {
    name: 'IFTTT Webhooks',
    extensionId: 'iftttWebhooks',
    collaborator: 'SlupekDev',
    iconURL: iftttWebhooksIconURL,
    insetIconURL: iftttWebhooksInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage='Using the IFTTT webhooks in Scratch3.'
            description='Using the IFTTT webhooks in Scratch3.'
            id='gui.extension.iftttWebhooks.description'
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true
};

export {entry}; // loadable-extension needs this line.
export default entry;
