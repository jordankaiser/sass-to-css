const path = require('path');
const fs = require('fs');

/**
 * Create a CSS file containing custom properties.
 *
 * @param {string} variableMap - A mapping of SCSS variables to custom properties.
 * @param {string} filePath - The output file path for the custom properties.
 */
async function createCustomProps(variableMap, filePath) {
  await appendText(filePath, '\n:root {');
  for (const variable of variableMap) {
    await appendText(filePath, `\n  ${variable.customPropName}: ${variable.value};`);
  }
  await appendText(filePath, '\n}');
  // return new Promise((resolve, reject) => {
  //   for (const variable of variableMap) {
  //     const textToAppend = `\n${variable.customPropName}: ${variable.value};`;
  //     try {
  //       fs.appendFileSync(filePath, textToAppend);
  //       console.log('Text appended to the file successfully.');
  //       resolve();
  //     } catch (err) {
  //       console.error('Error appending to the file:', err);
  //       reject(err);
  //     }
  //   }
  // });
}

async function appendText(filePath, textToAppend) {
  return new Promise((resolve, reject) => {
    try {
      fs.appendFileSync(filePath, textToAppend);
      console.log('Text appended to the file successfully.');
      resolve();
    } catch (err) {
      console.error('Error appending to the file:', err);
      reject(err);
    }
  });
}

module.exports = createCustomProps;