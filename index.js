const path = require('path');
const transformVariables = require('./js/transformVariables/index.js');
const createCustomProps = require('./js/createCustomProps/index.js');

/**
 * An array of objects containing the SCSS key, custom property key, and value.
 */
let variableMap = null;

/**
 * Initialize.
 */
async function init() {
  variableMap = await transformVariables(path.join(__dirname, 'variables', 'index.scss'))
  const outputFile = path.join(__dirname, 'variables', 'custom-props.css');
  await createCustomProps(variableMap, outputFile);
}
init();
