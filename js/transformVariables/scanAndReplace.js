const escapeRegexp = require("escape-string-regexp-node");

async function getReplacedFileText(file, stylingDatum) {
  return new Promise((resolve, reject) => {
    if (file && stylingDatum) {
      let updatedData = null;
      for (const stylingData of stylingDatum) {
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

module.exports = {getReplacedFileText};