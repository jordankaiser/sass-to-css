const path = require('path');
const transformVariables = require('./js/transformVariables/index.js');
const initTransformMixin = require('./js/transformMixins/index.js');

transformVariables(path.join(__dirname, 'variables', 'index.scss'));

async function goTransformers() {
  const files = [
    path.join(__dirname, 'variables', 'index.scss'),
    path.join(__dirname, 'files', 'file-one.scss'),
  ]
  console.log('__dirname', __dirname);
  for (const file of files) {
    console.log('file', file);
    await initTransformMixin(file);
  }
}

goTransformers();