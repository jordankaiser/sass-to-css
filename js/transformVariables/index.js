const fs = require('fs');
const readline = require('readline');
const initFindAndReplace = require('./initFindAndReplace.js');

/**
 * Convert string to kebab case.
 *
 * @param {string} theString - The string to convert.
 * @return {string} The converted string.
 */
function camelToKebab(theString) {
  return theString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Transform SCSS variables to CSS custom properties in files.
 *
 * @param {string} filePath - The directory containing the scss.
 * @return {array} An array of objects containing the SCSS key, custom property key, and value.
 */
async function transformVariables(filePath) {
  return new Promise((resolve, reject) => {
    try {
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
            data.customPropName = `--${customPropName}`;
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
        if (variableMap.length === 0) {
          throw new Error('No variables found.');
        }
        initFindAndReplace(variableMap);
        resolve(variableMap);
      });
    }  catch (error) {
      reject(error);
    }
  });
}

module.exports = transformVariables;