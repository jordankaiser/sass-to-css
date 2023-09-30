const fs = require('fs');
const path = require('path');

const directoryPath = './your_directory_path'; // Replace with the path to your directory
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

scanAndReplace(directoryPath, searchText, replaceText);
