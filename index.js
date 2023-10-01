const path = require('path');
const transformVariables = require('./js/transformVariables.js');

transformVariables(path.join(__dirname, 'variables', 'index.scss'));