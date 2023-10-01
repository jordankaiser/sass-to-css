const path = require('path');
const fs = require('fs');
const readline = require('readline');
const initFindAndReplace = require('./initFindAndReplace.js');

function camelToKebab(camelCase) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function processedFile(filePath) {
  const variableMap = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout, // You can change this to another writable stream if needed
    terminal: false, // This prevents readline from treating the input as a TTY (terminal)
  });
  
  rl.on('line', (line) => {

    const hasKey = line.match(/^(.*?):/);
    if (hasKey) {
      const scssName = hasKey[1];
      const customPropName = `${camelToKebab(hasKey[1]).substring(1)}`;

      if (scssName && customPropName) {
        variableMap.push({
          [scssName]: `var(--${customPropName})`,
        });
      }
    }
  });
  
  rl.on('close', () => {
    // console.log('----Finished reading the file.-----');
    initFindAndReplace(variableMap);
    return variableMap;
  });
}

module.exports = processedFile;