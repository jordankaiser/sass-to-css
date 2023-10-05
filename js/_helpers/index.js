const fs = require('fs');
const path = require('path');

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

module.exports = {getDirectories, getFileText};