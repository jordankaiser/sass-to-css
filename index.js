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
    // Process each line here
    // console.log(`Line: ${line}`);

    let key = null;
    const hasKey = line.match(/\$(.*?):/);
    if (hasKey) {
      key = camelToKebab(hasKey[1]);
      console.log('key: ' + key); // Output: "some_text"
    }

    let value = null;
    const hasValue = line.match(/:(.*?);/);
    if (hasValue) {
      value = hasValue[1].substring(1);
      console.log('value: ' + value); // Output: "some_text"
    }

    if (key && value) {
      variableMap.push({
        [key]: value,
      });
    }
  });
  
  rl.on('close', () => {
    console.log('Finished reading the file.');
    console.log(variableMap);
  });
}

processFile(filePath);

const directoryPath = path.join(__dirname, 'files'); // Replace with the path to your directory
const searchText = 'old_text'; // Replace with the text you want to find
const replaceText = 'new_text'; // Replace with the text you want to replace

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