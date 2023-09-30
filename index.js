
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'files');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  const needle = 'watermelon';
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const filePath = path.join(directoryPath, file);
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) throw err;
      if (data.includes(needle)) {
        console.log(data)
      } else {
        console.log(`${needle} not found in ${file}`)
      }
    });
  });
});