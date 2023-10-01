const path = require('path');
const fs = require('fs');
const escapeRegexp = require("escape-string-regexp-node");
const { rejects } = require('assert');

function scanAndReplace(directoryPath, searchTexts, replaceText) {
  try {
    const files = fs.readdirSync(directoryPath)
    files.map(fileName => {
      const filePath = path.join(directoryPath, fileName);
      try {
        const file = fs.readFileSync(filePath, 'utf8');
        
        searchTexts.forEach(searchText => {
          const escapedSearchText = escapeRegexp(searchText.value);
          // console.log('searchText.value', searchText.value);
          // console.log('searchText.type', searchText.type)
          // console.log('escapedSearchText', escapedSearchText);
          // console.log('-------------------');
          let updatedData = null;
          // console.log('searchText.type', searchText.type);
          switch (searchText.type) {
            case 'space':
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText} `);
              const foo = async () => {
                await writeFile(filePath, updatedData, directoryPath, fileName);
              }
              foo();
              break;
              
            case 'semicolon':
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText};`);
              const foo2 = async () => {
                await writeFile(filePath, updatedData);
              }
              foo2();
              break;
              
            case 'colon':
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText},`);
              async () => {
                await writeFile(filePath, updatedData, directoryPath, fileName);
              }
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

async function writeFile(filePath, updatedData) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(filePath, updatedData, 'utf8');
      resolve();
    } catch (error) {
      console.error('Error writing file:', error);
      reject();
    }
  });
}

module.exports = scanAndReplace;