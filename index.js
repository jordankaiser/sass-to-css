const path = require('path');
const createVariableMap = require('./js/transformVariables/index.js');
const createCustomProps = require('./js/createCustomProps/index.js');
const findAndReplace = require('./js/findAndReplace/index.js');
const question = require('./js/prompts/index.js');
const {
  customPropertiesPath,
  customPropertiesFileName,
  scssVariablesFile,
  scssFiles,
} = require('./scss-to-css.config.js');

/**
 * An array of objects containing the SCSS key, custom property key, and value.
 * A map of the data needed to tranform SCSS to CSS.
 */
let variableMap = null;

/**
 * The output file path for the custom properties.
 */
const outputFileInfo = {
  path: path.join(__dirname, customPropertiesPath),
  file: customPropertiesFileName,
}

/**
 * The SCSS variables file path.
 */
const sassVariablesFile = path.join(__dirname, scssVariablesFile);

/**
 * The directory containing the SCSS files to transform.
 */
const sassFiles = path.join(__dirname, scssFiles);

/**
 * Initialize.
 */
async function init() {
  const begin = await question('begin');
  if (begin) {
    variableMap = await createVariableMap(sassVariablesFile);

    // Create the custom properties file.
    const create = await question('create');
    if (create) {
      await createCustomProps(variableMap, outputFileInfo);
    }

    // Find and replace the SCSS variables with custom properties.
    const replace = await question('replace');
    if (replace) {
      await findAndReplace(variableMap, sassFiles, sassVariablesFile);
    }
  }
  console.log('Exiting.');
}
init();

