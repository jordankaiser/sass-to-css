const path = require('path');
const transformVariables = require('./js/transformVariables/index.js');

/**
 * An array of objects containing the SCSS key, custom property key, and value.
 */
let data = null;

/**
 * Initialize.
 */
async function init() {
  data = await transformVariables(path.join(__dirname, 'variables', 'index.scss'))
  const foo = data;
  const bar = 'hi';
}
init();
