const path = require('path');
const createVariableMap = require('./js/transformVariables/index.js');
const createCustomProps = require('./js/createCustomProps/index.js');
const findAndReplace = require('./js/findAndReplace/index.js');

/**
 * An array of objects containing the SCSS key, custom property key, and value.
 * A map of the data needed to tranform SCSS to CSS.
 */
let variableMap = null;

/**
 * The output file path for the custom properties. Customize as needed.
 */
const outputFileInfo = {
  path: path.join(__dirname, 'custom-props'),
  file: 'custom-props.css',
}

/**
 * The SCSS variables file path. Customize as needed.
 */
const sassVariablesFile = path.join(__dirname, 'variables', 'index.scss');

/**
 * The directory containing the SCSS files to transform. Customize as needed.
 */
const sassFiles = path.join(__dirname, 'files');

/**
 * Initialize.
 */
async function init() {
  variableMap = await createVariableMap(sassVariablesFile);
  await findAndReplace(variableMap, sassFiles, sassVariablesFile);
  await createCustomProps(variableMap, outputFileInfo);
}
init();
