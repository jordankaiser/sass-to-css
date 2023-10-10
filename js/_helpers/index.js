const fs = require('fs');
const path = require('path');

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

/**
 * Append text to a file.
 *
 * @param {string} filePath - The file to append text to.
 * @param {string} textToAppend - The text to append to the file.
 */
async function appendText(filePath, textToAppend) {
  return new Promise((resolve, reject) => {
    try {
      fs.appendFileSync(filePath, textToAppend);
      console.log('Text appended to the file successfully.');
      resolve();
    } catch (err) {
      console.error('Error appending to the file:', err);
      reject(err);
    }
  });
}

module.exports = {getFileText, getFilePath, appendText};