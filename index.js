const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
      const customPropName = camelToKebab(hasKey[1]).substring(1);

      if (scssName && customPropName) {
        variableMap.push({
          [scssName]: `var(--${customPropName})`,
        });
      }
    }
  });
  
  rl.on('close', () => {
    console.log('----Finished reading the file.-----');
    console.log(variableMap);
    initFindAndReplace();
  });
}

processFile(filePath);

const directoryPath = path.join(__dirname, 'files'); // Replace with the path to your directory
const searchText = 'old_text'; // Replace with the text you want to find
const replaceText = 'new_text'; // Replace with the text you want to replace

console.log(variableMap.length);

function initFindAndReplace() {
  if (variableMap.length > 0) {
    variableMap.forEach((variable) => {
      const key = Object.keys(variable)[0];
      const value = variable[key];
      console.log('---');
      console.log(key, value);
      console.log('---');
      // scanAndReplace(directoryPath, key, value);
    });
  }
}

function scanAndReplace(directoryPath, searchText, replaceText) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          return;
        }

        const updatedData = data.replace(new RegExp(searchText, 'g'), replaceText);

        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing file ${filePath}: ${err}`);
            return;
          }
          console.log(`Updated file: ${filePath}`);
        });
      });
    });
  });
}

// scanAndReplace(directoryPath, searchText, replaceText);