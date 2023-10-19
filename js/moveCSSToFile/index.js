const { getFileText } = require('../_helpers/index.js');

async function moveCSSToFile(cssFile) {
  const fileText = await getFileText(cssFile)
    .catch((err) => {
      console.error('Error getting file text:', err);
    });
  if (fileText) {
    processText(fileText);
  }
}

function processText(fileText) {
  // Define a regular expression to capture the entire comment block
  const regex = /\/\* REPLACER_START\s+(.*?)\s+\*\/([\s\S]*?)\/\* REPLACER_END\s+(.*?)\s+\*\//g;

  // Use the matchAll() method to find all matches in the input text
  const matches = [...fileText.matchAll(regex)];

  // Extract and print file paths and code in a loop
  for (const match of matches) {
    const filePath = match[1];
    const codeBetweenComments = match[2];

    console.log('File Path:', filePath);
    console.log('Code Between Comments:');
    console.log(codeBetweenComments);
    console.log('------------------------------');
  }
}

module.exports = moveCSSToFile;