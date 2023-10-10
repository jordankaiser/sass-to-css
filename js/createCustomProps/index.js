const path = require('path');
const fs = require('fs');

/**
 * Create a CSS file containing custom properties.
 *
 * @param {string} variableMap - A mapping of SCSS variables to custom properties.
 * @param {string} filePath - The output file path for the custom properties.
 */
async function createCustomProps(variableMap, filePath) {
  return new Promise((resolve, reject) => {
    const textToAppend = '\nThis is new content to append.';
    for (const variable of variableMap) {
      try {
        fs.appendFileSync(filePath, textToAppend);
        console.log('Text appended to the file successfully.');
        resolve();
      } catch (err) {
        console.error('Error appending to the file:', err);
        reject(err);
      }
    }
    
  });
}

module.exports = createCustomProps;