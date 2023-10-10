const fs = require('fs');
const readline = require('readline');
const initFindAndReplace = require('./initFindAndReplace.js');

function camelToKebab(camelCase) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function transformVariables(filePath) {
  const variableMap = [];

  // Create a readable stream.
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });
  
  // Read each line.
  rl.on('line', (line) => {
    const data = {};

    // Get the SCSS key. This regex matches the first word followed by a colon. 
    const getKey = line.match(/^(.*?):/);
    if (getKey) {

      // SCSS Key.
      const scssName = getKey[1];
      if (scssName) {
        data.scssKey = scssName;
      }

      // Custom Property Key. Convert the SCSS key to kebab case and remove the first character.
      const customPropName = `${camelToKebab(getKey[1]).substring(1)}`;
      if (customPropName) {
        data.customPropKey = `var(--${customPropName})`;
      }
    }

    // Value. This regex matches the first word after a space and before a semicolon.
    const value = line.match(/(?<=\s)[^;]+/g);
    if (value) {
      data.value = value[0];
    }

    if (data.scssKey && data.customPropKey && data.value) {
      variableMap.push(data);
    }
  });
  
  rl.on('close', () => {
    initFindAndReplace(variableMap);
  });
}

module.exports = transformVariables;