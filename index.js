const path = require('path');
const transformVariables = require('./js/transformVariables/index.js');
const initTransformMixin = require('./js/transformMixins/index.js');

transformVariables(path.join(__dirname, 'variables', 'index.scss'));

initTransformMixin();