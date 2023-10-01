const path = require('path');
const scanAndReplace = require('./scanAndReplace');

function initFindAndReplace(variableMap) {
  if (variableMap.length > 0) {
    const directoryPath = path.join(__dirname, '..', '..', 'files');
    Array.from(variableMap).forEach((variable) => {
      const key = Object.keys(variable)[0];
      const value = variable[key];
      scanAndReplace(directoryPath, key, value);
    });
  }
}

module.exports = initFindAndReplace;