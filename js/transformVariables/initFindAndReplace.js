const path = require('path');
const fs = require('fs');
const {getReplacedFileText} = require('./scanAndReplace');
const {getDirectories, getFileText} = require('./../_helpers/index.js');

async function initFindAndReplace(variableMap, variableMap2) {
  if (variableMap.length > 0) {
    const directoryPath = path.join(__dirname, '..', '..', 'files');
    const searchNeedles = ['semicolon', 'colon', 'space'];
    const stylingDatum = [];
    variableMap2.forEach((variable) => {
      return searchNeedles.forEach((needle) => {
        switch (needle) {
          case 'semicolon':
            stylingDatum.push({
              replacement: variable.customPropKey,
              needle: `${variable.scssKey};`,
              type: 'semicolon',
            });
            break;
          case 'colon':
            stylingDatum.push({
              replacement: variable.customPropKey,
              needle: `${variable.scssKey},`,
              type: 'colon',
            });
            break;
          case 'space':
            stylingDatum.push({
              replacement: variable.customPropKey,
              needle: `${variable.scssKey} `,
              type: 'space',
            });
            break;
        }
      });
    });
    const directories = await getDirectories(directoryPath);
    const filesText = [];
    for (const file of directories) {
      const fileText = await getFileText(file);
      filesText.push({
        text: fileText,
        path: file,
      });
    }
    for (const file of filesText) {
      const replacedFileText = await getReplacedFileText(file.text, stylingDatum);
      fs.writeFileSync(file.path, replacedFileText, 'utf8');
    }
  }
}

module.exports = initFindAndReplace;