const path = require('path');
const {getDirectories, getFileText, writeFile, getReplacedFileText} = require('./scanAndReplace');

async function initFindAndReplace(variableMap) {
  if (variableMap.length > 0) {
    const directoryPath = path.join(__dirname, '..', '..', 'files');
    const searchNeedles = ['semicolon', 'colon', 'space'];
    const stylingDatum = [];
    Array.from(variableMap).forEach((variable) => {
      const key = Object.keys(variable)[0];
      return searchNeedles.forEach((needle) => {
        switch (needle) {
          case 'semicolon':
            stylingDatum.push({
              replacement: variable[key],
              needle: `${key};`,
              type: 'semicolon',
            });
            break;
          case 'colon':
            stylingDatum.push({
              replacement: variable[key],
              needle: `${key},`,
              type: 'colon',
            });
            break;
          case 'space':
            stylingDatum.push({
              replacement: variable[key],
              needle: `${key} `,
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
    // console.log('stylingDatum: ', stylingDatum);
    // TODO: Need to combine stylingDatum with filesText the loop through using writeFile().
    for (const file of filesText) {
      const replacedFileText = await getReplacedFileText(file.text, stylingDatum);
      await writeFile(file.path, replacedFileText);
      // console.log('\nreplacedFileText:');
      // console.log(replacedFileText);
      // console.log('****');
    }
    for (const stylingData of stylingDatum) {
      // console.log('files: ', files);
      // for (const file of files) {
      //   await writeFile(file, stylingData);
      // }
    }
  }
}

module.exports = initFindAndReplace;