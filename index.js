const path = require('path');
const createVariableMap = require('./js/transformVariables/index.js');
const createCustomProps = require('./js/createCustomProps/index.js');
const initFindAndReplace = require('./js/transformVariables/initFindAndReplace.js');

/**
 * An array of objects containing the SCSS key, custom property key, and value.
 */
let variableMap = null;

/**
 * The output file path for the custom properties. Customize as needed.
 */
const outputFile = path.join(__dirname, 'variables', 'custom-props.css');

/**
 * The SCSS variables file path. Customize as needed.
 */
const sassVariablesFile = path.join(__dirname, 'variables', 'index.scss');

/**
 * Initialize.
 */
async function init() {
  variableMap = await createVariableMap(sassVariablesFile);
  await initFindAndReplace(variableMap);
  await createCustomProps(variableMap, outputFile);
}
init();
