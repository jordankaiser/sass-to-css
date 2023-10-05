const escapeRegexp = require("escape-string-regexp-node");

// async function getDirectories(directoryPath) {
//   return new Promise((resolve, reject) => {
//     try {
//       const files = fs.readdirSync(directoryPath);
//       resolve(files.map(fileName =>  path.join(directoryPath, fileName)));
//     } catch (error) {
//       console.error('Error reading directory:', error);
//       reject();
//     }
//   });
// }

// async function getFileText(file) {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve(fs.readFileSync(file, 'utf8'));
//     }  catch (error) {
//       console.error('Error reading file:', error);
//       reject(error);
//     }
//   });
// }

async function getReplacedFileText(file, stylingDatum) {
  return new Promise((resolve, reject) => {
    if (file && stylingDatum) {
      // console.log('\nfile:');
      // console.log(file);
      // console.log('\nstylingDatum:');
      // console.log(stylingDatum);
      // console.log('---');
      let updatedData = null;
      for (const stylingData of stylingDatum) {
        // console.log('\nstylingData.replacement:');
        // console.log(stylingData.replacement);
        // console.log('\nstylingData.needle:');
        // console.log(stylingData.needle);
        // console.log('\nstylingData.type:');
        // console.log(stylingData.type);
        // console.log('\nfile:');
        // console.log(file);
        // console.log('---');
        const escapedSearchText = escapeRegexp(stylingData.needle);
        switch (stylingData.type) {
          case 'space':
            if (!updatedData) {
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${stylingData.replacement} `);
            } else {
              updatedData = updatedData.replace(new RegExp(escapedSearchText, 'g'), `${stylingData.replacement} `);
            }
            break;
            
          case 'semicolon':
            if (!updatedData) {
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${stylingData.replacement};`);
            } else {
              updatedData = updatedData.replace(new RegExp(escapedSearchText, 'g'), `${stylingData.replacement};`);
            }
            break;
            
          case 'colon':
            if (!updatedData) {
              updatedData = file.replace(new RegExp(escapedSearchText, 'g'), `${stylingData.replacement},`);
            } else {
              updatedData = updatedData.replace(new RegExp(escapedSearchText, 'g'), `${stylingData.replacement},`);
            }
            break;
            
          default:
            console.error('Error: searchText.type not found');
            return;
        }
      }
      resolve(updatedData);
    } else {
      console.error('Error: file or stylingDatum is null');
      reject();
    }
  });
}

// async function writeFile(filePath, updatedData, charset = 'utf8') {
//   fs.writeFileSync(filePath, updatedData, charset);
// }

module.exports = {getReplacedFileText};