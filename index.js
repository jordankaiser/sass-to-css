const path = require('path');
const transformVariables = require('./js/transformVariables/index.js');

const foo = transformVariables(path.join(__dirname, 'variables', 'index.scss'));
const bar = foo;
