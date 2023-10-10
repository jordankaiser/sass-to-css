const fs = require('fs');
const {appendText} = require('./../_helpers/index.js');

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
}

module.exports = createCustomProps;