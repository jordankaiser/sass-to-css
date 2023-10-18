const fs = require('fs');
const {glob} = require('glob');
const {getFileText} = require('./../_helpers/index.js');

/**
 * Add comments to files to indicate where they where created.
 *
 * @param {string} scssFilePath - The path to the SCSS files.
 * @param {array} ignoreDirectories - The directories to ignore.
 */
async function addFileComments(scssFilePath, ignoreDirectoryPaths) {
  const directories = await glob(scssFilePath + '**/*.scss', { ignore: ignoreDirectoryPaths });
  const filesText = [];
  for (const file of directories) {
    const fileText = await getFileText(file);
    filesText.push({
      text: fileText,
      path: file,
    });
  }
  for (const file of filesText) {
    if (file.text && file.path) {
      const fileWithComments = insertComments(file);
      fs.writeFileSync(file.path, fileWithComments, 'utf8');
    }
  }
}

/**
 * Adds a comment to the top and bottom of a file.
 *
 * @param {string} n - The text that needs comments.
 * @return {string} The text with comments inserted.
 */
function insertComments(text) {
  const commentTop = `/* REPLACER_START ${text.path} */\n`;
  const commentBottom = `\n/* REPLACER_END ${text.path} */`;
  return commentTop + text.text + commentBottom;
}

module.exports = addFileComments;