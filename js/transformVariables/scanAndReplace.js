const path = require('path');
const fs = require('fs');
const escapeRegexp = require("escape-string-regexp-node");

function scanAndReplace(directoryPath, searchText, replaceText) {
  try {
    const files = fs.readdirSync(directoryPath)
    files.map(fileName => {
      const filePath = path.join(directoryPath, fileName);
      try {
        const file = fs.readFileSync(filePath, 'utf8');
        const escapedSearchText = escapeRegexp(searchText);
        const updatedData = file.replace(new RegExp(escapedSearchText, 'g'), replaceText);
  
        try {
          fs.writeFileSync(filePath, updatedData, 'utf8');
          console.log('File written successfully.');
          return path.join(directoryPath, fileName);
        } catch (error) {
          console.error('Error writing file:', error);
          return path.join(directoryPath, fileName);
        }
      }  catch (error) {
        console.error('Error reading file:', error);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

module.exports = scanAndReplace;