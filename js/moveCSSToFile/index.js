const fs = require('fs');
const { getFileText } = require('../_helpers/index.js');

async function moveCSSToFile(cssFile) {
  const file = await getFileText(cssFile)
    .catch((err) => {
      console.error('Error getting file text:', err);
    });
  if (file) {
    const processedCSS = processCSS(file);
    if (!processedCSS) return;
    await moveToFile(processedCSS);
  }
}

/**
 * Moves CSS to a file.
 *
 * @param {string} n - A string param
 */
async function moveToFile(processedCSS) {
  for (const item of processedCSS) {
    const filePath = item.filePath.replace(/\.scss$/, '.css');
    const fileContents = item.cssCode;
    fs.writeFileSync(filePath, fileContents, 'utf8');
  }
}

/**
 * Captures text enclosed by comment blocks that start with /* REPLACER_START 
 * and end with REPLACER_END. It captures three different parts:
 *
 * The entire comment block, including the start and end comments.
 * The file path between the start comment and the first space character after it.
 * The code or content between the start and end comments.
 */
const processRegEx = /\/\* REPLACER_START\s+(.*?)\s+\*\/([\s\S]*?)\/\* REPLACER_END\s+(.*?)\s+\*\//g;

/**
 * Process the css file extracting the file paths and code between comments.
 *
 * @param {string} cssFile - The file text
 * @return {array} An array of objects containing the file path and code between comments.
 */
function processCSS(cssFile) {
  // Use the matchAll() method to find all matches in the input text
  const matches = [...cssFile.matchAll(processRegEx)];

  const texts = [];

  // Extract and print file paths and code in a loop
  for (const match of matches) {
    const filePath = match[1];
    const cssCode = match[2];

    if (filePath && cssCode) {
      texts.push({
        filePath,
        cssCode,
      });
    }
  }
  return texts.length > 0 ? texts : null;
}

module.exports = moveCSSToFile;