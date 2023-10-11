const fs = require('fs/promises');
const path = require('path');

async function getFileText(file) {
  try {
    return await fs.readFile(file, 'utf8');
  }  catch (error) {
    console.error('Error occurred get file text:', error)
  }
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
  try {
    return await fs.appendFile(filePath, textToAppend);
  } catch (err) {
    console.error('Error appending to the file:', err);
  }
}

module.exports = {getFileText, getFilePath, appendText};