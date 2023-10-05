const sass = require('sass');
const path = require('path');

async function initTransformMixin(file) {
  // console.log('initTransformMixin');
  // TODO: We have to have all the css in one file so things like $variables work.
  // Could do in such a way so it would be easy to split out later?
  // const result = await sass.compileAsync(file);
  // console.log('\nresult');
  // console.log(result);
  // console.log('---');
}

module.exports = initTransformMixin;