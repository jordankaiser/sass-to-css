const path = require('path');
const transformVariables = require('./js/transformVariables/index.js');

transformVariables(path.join(__dirname, 'variables', 'index.scss'));