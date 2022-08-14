import React from 'react';
import {FormattedMessage} from 'react-intl';

import tmpose2scratchIconURL from './tmpose2scratch.png';
import tmpose2scratchInsetIconURL from './tmpose2scratch-small.png';

const entry = {
    name: 'TMPose2Scratch',
    extensionId: 'tmpose2scratch',
    collaborator: 'Tsukurusha, YengawaLab and Google',
    iconURL: tmpose2scratchIconURL,
    insetIconURL: tmpose2scratchInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Recognize your own poses."
            id="gui.extension.tmpose2scratch.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    bluetoothRequired: false
};

export {entry}; // loadable-extension needs this line.
export default entry;
