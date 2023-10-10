/**
 * This is a function.
 *
 * @param {string} variableMap - A mapping of SCSS variables to custom properties.
 */
async function createCustomProps(variableMap) {
  return new Promise((resolve, reject) => {
    try {
      variableMap.forEach(variable => {
        const foo = variable;
      });
      resolve();
    }  catch (error) {
      reject(error);
    }
  });
}

module.exports = createCustomProps;