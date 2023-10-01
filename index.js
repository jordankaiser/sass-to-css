const fs = require('fs');
const path = require('path');
const readline = require('readline');
const escapeRegexp = require("escape-string-regexp-node");

function camelToKebab(camelCase) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const filePath = path.join(__dirname, 'variables/index.scss'); // Replace with the path to your text file
const variableMap = [];
function processFile(filePath) {

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout, // You can change this to another writable stream if needed
    terminal: false, // This prevents readline from treating the input as a TTY (terminal)
  });
  
  rl.on('line', (line) => {

    const hasKey = line.match(/^(.*?):/);
    if (hasKey) {
      const scssName = hasKey[1];
      const customPropName = `${camelToKebab(hasKey[1]).substring(1)}`;

      if (scssName && customPropName) {
        variableMap.push({
          [scssName]: `var(--${customPropName})`,
        });
      }
    }
  });
  
  rl.on('close', () => {
    // console.log('----Finished reading the file.-----');
    initFindAndReplace(variableMap);
  });
}

processFile(filePath);

const directoryPath = path.join(__dirname, 'files'); // Replace with the path to your directory

function initFindAndReplace(variableMap) {
  if (variableMap.length > 0) {
    Array.from(variableMap).forEach((variable) => {
      const key = Object.keys(variable)[0];
      const value = variable[key];
      scanAndReplace(directoryPath, key, value);
    });
  }
}

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