const fs = require('fs');
const path = require('path');

async function getDirectories(directoryPath) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(directoryPath);
      resolve(files.map(fileName =>  path.join(directoryPath, fileName)));
    } catch (error) {
      reject(error);
    }
  });
}

async function getFileText(file) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.readFileSync(file, 'utf8'));
    }  catch (error) {
      reject(error);
    }
  });
}

/**
 * This is a function.
 *
 * @param {string} filePath - A string param
 */
function getFilePath(filePath) {
  const outputFile = path.join(__dirname, 'variables', 'index.scss');
  const dirname = __dirname;
}

module.exports = {getDirectories, getFileText, getFilePath};