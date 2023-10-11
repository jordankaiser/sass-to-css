const path = require('path');
const fs = require('fs');
const {getReplacedFileText} = require('./getReplacedFileText.js');
const {getFileText} = require('./../_helpers/index.js');
const {glob} = require('glob');

async function findAndReplace(variableMap, directoryPath, sassVariablesFile) {
  if (variableMap.length > 0) {
    const searchNeedles = ['semicolon', 'colon', 'space'];
    const stylingDatum = [];
    variableMap.forEach((variable) => {
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
    const directories = await glob(directoryPath + '/**/*.scss', { ignore: '_01.generated-vars.scss' });
    const filesText = [];
    for (const file of directories) {
      const fileText = await getFileText(file);
      filesText.push({
        text: fileText,
        path: file,
      });
    }
    for (const file of filesText) {
      if (file.text && file.path) {
        const replacedFileText = await getReplacedFileText(file.text, stylingDatum);
        fs.writeFileSync(file.path, replacedFileText, 'utf8');
      }
    }
  }
}

module.exports = findAndReplace;