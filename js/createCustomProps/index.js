const {appendText} = require('./../_helpers/index.js');

/**
 * Create a CSS file containing custom properties.
 *
 * @param {string} variableMap - A mapping of SCSS variables to custom properties.
 * @param {string} filePath - The output file path for the custom properties.
 */
async function createCustomProps(variableMap, filePath) {
  // Add the first line.
  await appendText(filePath, '\n:root {');

  // Loop through each variable and add it to the file.
  for (const variable of variableMap) {
    await appendText(filePath, `\n  ${variable.customPropName}: ${variable.value};`);
  }

  // Add the last line.
  await appendText(filePath, '\n}');
}

module.exports = createCustomProps;