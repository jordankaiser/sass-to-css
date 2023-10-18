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

console.log(customPropertiesPath);
console.log(customPropertiesFileName);
console.log(scssVariablesFile);
console.log(scssFiles);

/**
 * An array of objects containing the SCSS key, custom property key, and value.
 * A map of the data needed to tranform SCSS to CSS.
 */
let variableMap = null;

/**
 * The output file path for the custom properties. Customize as needed.
 */
const outputFileInfo = {
  path: path.join(__dirname, customPropertiesPath),
  file: customPropertiesFileName,
}

/**
 * The SCSS variables file path. Customize as needed.
 */
const sassVariablesFile = path.join(__dirname, scssVariablesFile);

/**
 * The directory containing the SCSS files to transform. Customize as needed.
 */
const sassFiles = path.join(__dirname, scssFiles);

/**
 * Initialize.
 */
async function init() {
  const begin = await question('begin');
  if (begin) {
    variableMap = await createVariableMap(sassVariablesFile);
    const replace = await question('replace');
    if (replace) {
      await findAndReplace(variableMap, sassFiles, sassVariablesFile);
    }
    const create = await question('create');
    if (create) {
      await createCustomProps(variableMap, outputFileInfo);
    }
  }
  console.log('Exiting.');
}
init();

