#!/bin/sh

DIR=$(dirname $0)
LF=$(printf '\\\012_')
LF=${LF%_}

EXTENSION_ID=$1

mkdir -p node_modules/scratch-vm/src/extensions/scratch3_${EXTENSION_ID}
cp -LR ${DIR}/../scratch-vm/src/extensions/scratch3_${EXTENSION_ID}/* node_modules/scratch-vm/src/extensions/scratch3_${EXTENSION_ID}/
mv node_modules/scratch-vm/src/extension-support/extension-manager.js node_modules/scratch-vm/src/extension-support/extension-manager.js_orig
sed -e "s|class ExtensionManager {$|builtinExtensions['${EXTENSION_ID}'] = () => require('../extensions/scratch3_${EXTENSION_ID}');${LF}${LF}class ExtensionManager {|g" node_modules/scratch-vm/src/extension-support/extension-manager.js_orig > node_modules/scratch-vm/src/extension-support/extension-manager.js

mkdir -p src/lib/libraries/extensions/${EXTENSION_ID}
cp -LR ${DIR}/../scratch-gui/src/lib/libraries/extensions/${EXTENSION_ID}/* src/lib/libraries/extensions/${EXTENSION_ID}/
mv src/lib/libraries/extensions/index.jsx src/lib/libraries/extensions/index.jsx_orig
sed -e "s|^export default \[$|import ${EXTENSION_ID}Entry from './${EXTENSION_ID}/index.jsx';${LF}${LF}export default [${LF}    ${EXTENSION_ID}Entry,|g" src/lib/libraries/extensions/index.jsx_orig > src/lib/libraries/extensions/index.jsx
