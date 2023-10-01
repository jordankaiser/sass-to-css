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
    // console.log('variableMap as param', variableMap);
    Array.from(variableMap).forEach((variable) => {
      // console.log('variable: ', variable);
      const key = Object.keys(variable)[0];
      const value = variable[key];
      // console.log('key: ', key);
      // console.log('value: ', value);
      // console.log('directoryPath: ', directoryPath);
      // console.log('---');
      scanAndReplace(directoryPath, key, value);
    });
  }
}

function scanAndReplace(directoryPath, searchText, replaceText) {
  try {
    const files = fs.readdirSync(directoryPath);
    files.map(fileName => {
      console.log('path.join(directoryPath, fileName)', path.join(directoryPath, fileName));
      const filePath = path.join(directoryPath, fileName);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          return;
        }

        // console.log(`Replacing ${searchText} with ${replaceText} in ${filePath}`);
        // console.log('typeof searchText', typeof searchText);
        // console.log('typeof replaceText', typeof replaceText);

        const escapedSearchText = escapeRegexp(searchText);
        const escapedReplaceText = escapeRegexp(replaceText);
        const updatedData = data.replace(new RegExp(escapedSearchText, 'g'), replaceText);
        console.log('updatedData: ', updatedData);
        console.log('---');

        try {
          fs.writeFileSync(filePath, updatedData, 'utf8');
          console.log('File written successfully.');
          return path.join(directoryPath, fileName);
        } catch (error) {
          console.error('Error writing file:', error);
          return path.join(directoryPath, fileName);
        }
      });
    });
    console.log('Directory contents:', files);
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  // fs.readdir(directoryPath, (err, files) => {
  //   if (err) {
  //     console.error(`Error reading directory: ${err}`);
  //     return;
  //   }

  //   files.forEach((file) => {
  //     const filePath = path.join(directoryPath, file);

  //     fs.readFile(filePath, 'utf8', (err, data) => {
  //       if (err) {
  //         console.error(`Error reading file ${filePath}: ${err}`);
  //         return;
  //       }

  //       // console.log(`Replacing ${searchText} with ${replaceText} in ${filePath}`);
  //       // console.log('typeof searchText', typeof searchText);
  //       // console.log('typeof replaceText', typeof replaceText);

  //       const escapedSearchText = escapeRegexp(searchText);
  //       const escapedReplaceText = escapeRegexp(replaceText);
  //       const updatedData = data.replace(new RegExp(escapedSearchText, 'g'), replaceText);
  //       console.log('updatedData: ', updatedData);
  //       console.log('---');

  //       try {
  //         fs.writeFileSync(filePath, updatedData, 'utf8');
  //         console.log('File written successfully.');
  //       } catch (error) {
  //         console.error('Error writing file:', error);
  //       }
  //     });
  //   });
  // });
}

const originalText = "This is a $foo text with $foo data.";

// Replace all occurrences of "sample" with "replacement"
const searchTextBlah = "$foo";
const replacementText = "var(--foo)";
const modifiedText = originalText.replace(new RegExp(searchTextBlah, 'g'), replacementText);

console.log(modifiedText); // Output: "This is a replacement text with replacement data."
