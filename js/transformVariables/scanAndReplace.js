const path = require('path');
const fs = require('fs');
const escapeRegexp = require("escape-string-regexp-node");

async function getDirectories(directoryPath) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(directoryPath);
      resolve(files.map(fileName =>  path.join(directoryPath, fileName)));
    } catch (error) {
      console.error('Error reading directory:', error);
      reject();
    }
  });
}

async function getFileText(file) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.readFileSync(file, 'utf8'));
    }  catch (error) {
      console.error('Error reading file:', error);
      reject(error);
    }
  });
}

async function writeFile(file, stylingData) {
  return new Promise((resolve, reject) => {
    try {
      // console.log('file: ', file);
      // console.log('stylingData: ', stylingData);
      // let updatedData = null;
      // const escapedSearchText = escapeRegexp(searchText);
      // switch (type) {
      //   case 'space':
      //     updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText} `);
      //     break;
          
      //   case 'semicolon':
      //     updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText};`);
      //     break;
          
      //   case 'colon':
      //     updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${replaceText},`);
      //     break;
          
      //   default:
      //     console.error('Error: searchText.type not found');
      //     return;
      // }
      // fs.writeFileSync(filePath, updatedData, 'utf8');
      // resolve();
    } catch (error) {
      console.error('Error writing file:', error);
      reject();
    }
  });
}

module.exports = {getDirectories, getFileText, writeFile};