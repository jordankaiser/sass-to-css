const path = require('path');
const fs = require('fs');
const escapeRegexp = require("escape-string-regexp-node");

function scanAndReplace(directoryPath, searchTexts, replaceText) {
  try {
    const files = fs.readdirSync(directoryPath)
    files.map(fileName => {
      const filePath = path.join(directoryPath, fileName);
      try {
        const file = fs.readFileSync(filePath, 'utf8');
        
        searchTexts.forEach(searchText => {
          const escapedSearchText = escapeRegexp(searchText.value);
          console.log('searchText.value', searchText.value);
          console.log('searchText.type', searchText.type)
          console.log('escapedSearchText', escapedSearchText);
          // console.log('-------------------');
          let updatedData = null;
          // console.log('searchText.type', searchText.type);
          switch (searchText.type) {
            case 'space':
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText} `);
              console.log('original', file);
              console.log('updated', updatedData);
              console.log('-------------');
              writeFile(filePath, updatedData, directoryPath, fileName);
              break;
              
            case 'semicolon':
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText};`);
              writeFile(filePath, updatedData, directoryPath, fileName);
              break;
              
            case 'colon':
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText},`);
              writeFile(filePath, updatedData, directoryPath, fileName);
              break;
              
            default:
              console.error('Error: searchText.type not found');
              return;
          }

          if (updatedData) {

          }
        });
  
      }  catch (error) {
        console.error('Error reading file:', error);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

function writeFile(filePath, updatedData, directoryPath, fileName) {
  try {
    fs.writeFileSync(filePath, updatedData, 'utf8');
    return path.join(directoryPath, fileName);
  } catch (error) {
    console.error('Error writing file:', error);
    return path.join(directoryPath, fileName);
  }
}

module.exports = scanAndReplace;