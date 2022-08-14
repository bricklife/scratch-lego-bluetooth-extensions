import React from 'react';
import {FormattedMessage} from 'react-intl';

import tm2scratchIconURL from './tm2scratch.png';
import tm2scratchInsetIconURL from './tm2scratch-small.png';

const entry = {
    name: 'TM2Scratch',
    extensionId: 'tm2scratch',
    collaborator: 'Tsukurusha, YengawaLab and Google',
    iconURL: tm2scratchIconURL,
    insetIconURL: tm2scratchInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Recognize your own poses."
            id="gui.extension.tm2scratch.description"
        />
    ),
    featured: true,
    disabled: false,
    internetConnectionRequired: true,
    bluetoothRequired: false
};

export {entry}; // loadable-extension needs this line.
export default entry;
