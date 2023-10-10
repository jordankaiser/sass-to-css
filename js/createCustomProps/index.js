const fs = require('fs');
const path = require('path');
const {appendText} = require('./../_helpers/index.js');

/**
 * Create a CSS file containing custom properties.
 *
 * @param {string} variableMap - A mapping of SCSS variables to custom properties.
 * @param {string} filePath - The output file path for the custom properties.
 */
async function createCustomProps(variableMap, fileInfo) {
  // Create the file if it doesn't exist.
  await createFile(fileInfo);

  // Create the file path.
  const filePath = path.join(fileInfo.path, fileInfo.file);
  
  // Add the first line.
  await appendText(filePath, '\n:root {');

  // Loop through each variable and add it to the file.
  for (const variable of variableMap) {
    await appendText(filePath, `\n  ${variable.customPropName}: ${variable.value};`);
  }

  // Add the last line.
  await appendText(filePath, '\n}');
}

async function createFile(fileInfo) {
  return new Promise((resolve, reject) => {
    try {
      // Check if the folder exists, and create it if it doesn't
      if (!fs.existsSync(fileInfo.path)) {
        fs.mkdirSync(fileInfo.path, { recursive: true });
        console.log('Folder created successfully.');
      } else {
        console.log('Folder already exists.');
      }
    
      // Check if the file exists, and create it if it doesn't
      const filePath = path.join(fileInfo.path, fileInfo.file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log('File created successfully.');
        resolve();
      } else {
        resolve();
        console.log('File already exists.');
      }
    } catch (err) {
      console.error('Error creating the folder or file:', err);
      reject(err);
    }
  });
}

module.exports = createCustomProps;