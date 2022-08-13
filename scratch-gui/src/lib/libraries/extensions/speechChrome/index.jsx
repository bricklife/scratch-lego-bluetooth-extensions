import React from 'react';
import {FormattedMessage} from 'react-intl';

import speechToTextIconURL from './speechChrome.png';

const entry = {
    name: "Speech to Text",
    extensionId: 'speechChrome',
    collaborator: 'SlupekDev (based on ML for Kinds extension)',
    iconURL: speechToTextIconURL,
    description: (
        <FormattedMessage
            defaultMessage="(Google Chrome browsers only)"
            description="Description for the Speech to Text extension"
            id="gui.extension.speechChrome.description"
        />
    ),
    featured: true,
    internetConnectionRequired: true
};

export {entry}; // loadable-extension needs this line.
export default entry;
