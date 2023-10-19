const fs = require('fs');
const {glob} = require('glob');
const {getFileText} = require('./../_helpers/index.js');
const sass = require('sass');
const path = require('path');

/**
 * Add comments to files to indicate where they where created.
 *
 * @param {string} scssFilePath - The path to the SCSS files.
 * @param {array} ignoreDirectories - The directories to ignore.
 */
async function addFileCommentsFoo(scssFilePath, ignoreDirectoryPaths) {
  const directories = await glob(scssFilePath + '/**/*.scss', { ignore: ignoreDirectoryPaths });
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


async function addFileComments(inputPathf) {
  console.log('chexk');
  // const outputPath = inputPath.replace('.scss', '.css');
  const inputPath = path.join(__dirname, '..', '..', 'files', 'file-one.scss');
  const outputPath = path.join(__dirname, '..', '..', 'files', 'file-one.css');

  console.log('inputPath', typeof inputPath);
  console.log('outputPath', typeof outputPath);

  await sass.compileAsync(inputPath)
    .then((result) => {
      fs.writeFileSync(outputPath, result.css, 'utf8');
      console.log(`Sass file compiled successfully: ${inputPath} -> ${outputPath}`);
    })
    .catch((error) => {
      console.error('Sass compilation error:', error);
    });
}

// /Users/jkmacbook/Sites/sass-to-css/files/file-one.scss

/**
 * Adds a comment to the top and bottom of a file.
 *
 * @param {string} text - The text that needs comments.
 * @return {string} The text with comments inserted.
 */
function insertComments(text) {
  const commentTop = `/* REPLACER_START ${text.path} */\n`;
  const commentBottom = `\n/* REPLACER_END ${text.path} */`;
  return commentTop + text.text + commentBottom;
}

module.exports = addFileComments;