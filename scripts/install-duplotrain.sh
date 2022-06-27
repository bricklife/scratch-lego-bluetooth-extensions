#!/bin/sh

EXTENSION_NAME='LEGO DUPLO Train'
EXTENSION_ID=duplotrain
COLLABORATOR=bricklife
EXTENSION_DESCRIPTION="Build and control your train."

CURRENT=$(cd $(dirname $0);pwd)
LF=$(printf '\\\012_')
LF=${LF%_}

mkdir -p node_modules/scratch-vm/src/extensions/scratch3_${EXTENSION_ID}
cp -LR ${CURRENT}/../scratch-vm/src/extensions/scratch3_${EXTENSION_ID}/* node_modules/scratch-vm/src/extensions/scratch3_${EXTENSION_ID}/
mv node_modules/scratch-vm/src/extension-support/extension-manager.js node_modules/scratch-vm/src/extension-support/extension-manager.js_orig
sed -e "s|class ExtensionManager {$|builtinExtensions['${EXTENSION_ID}'] = () => require('../extensions/scratch3_${EXTENSION_ID}');${LF}${LF}class ExtensionManager {|g" node_modules/scratch-vm/src/extension-support/extension-manager.js_orig > node_modules/scratch-vm/src/extension-support/extension-manager.js

mkdir -p src/lib/libraries/extensions/${EXTENSION_ID}
cp ${CURRENT}/../scratch-gui/src/lib/libraries/extensions/${EXTENSION_ID}/${EXTENSION_ID}* src/lib/libraries/extensions/${EXTENSION_ID}/
mv src/lib/libraries/extensions/index.jsx src/lib/libraries/extensions/index.jsx_orig

IMPORT="\
import ${EXTENSION_ID}IconURL from './${EXTENSION_ID}/${EXTENSION_ID}.png';${LF}\
import ${EXTENSION_ID}InsetIconURL from './${EXTENSION_ID}/${EXTENSION_ID}-small.svg';${LF}\
import ${EXTENSION_ID}ConnectionIconURL from './${EXTENSION_ID}/${EXTENSION_ID}-illustration.svg';${LF}\
import ${EXTENSION_ID}ConnectionSmallIconURL from './${EXTENSION_ID}/${EXTENSION_ID}-small.svg';${LF}\
import ${EXTENSION_ID}ConnectionTipIconURL from './${EXTENSION_ID}/${EXTENSION_ID}-button-illustration.svg';${LF}\
"

DESCRIPTION="\
    {${LF}\
        name: '${EXTENSION_NAME}',${LF}\
        extensionId: '${EXTENSION_ID}',${LF}\
        collaborator: '${COLLABORATOR}',${LF}\
        iconURL: ${EXTENSION_ID}IconURL,${LF}\
        insetIconURL: ${EXTENSION_ID}InsetIconURL,${LF}\
        description: (${LF}\
            <FormattedMessage${LF}\
                defaultMessage='${EXTENSION_DESCRIPTION}'${LF}\
                description='${EXTENSION_DESCRIPTION}'${LF}\
                id='gui.extension.${EXTENSION_ID}.description'${LF}\
            />${LF}\
        ),${LF}\
        featured: true,${LF}\
        bluetoothRequired: true,${LF}\
        launchPeripheralConnectionFlow: true,${LF}\
        useAutoScan: true,${LF}\
        connectionIconURL: ${EXTENSION_ID}ConnectionIconURL,${LF}\
        connectionSmallIconURL: ${EXTENSION_ID}ConnectionSmallIconURL,${LF}\
        connectionTipIconURL: ${EXTENSION_ID}ConnectionTipIconURL,${LF}\
        connectingMessage: (${LF}\
            <FormattedMessage${LF}\
                defaultMessage='Connecting'${LF}\
                description='Message to help people connect to their BOOST.'${LF}\
                id='gui.extension.boost.connectingMessage'${LF}\
            />${LF}\
        ),${LF}\
        helpLink: 'https://scratch.mit.edu/boost'${LF}\
    },"
sed -e "s|^export default \[$|${IMPORT}${LF}export default [${LF}${DESCRIPTION}|g" src/lib/libraries/extensions/index.jsx_orig > src/lib/libraries/extensions/index.jsx
