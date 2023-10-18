// The folder to output the custom properties file to. Relative to this directory.
// Example: '../sass/00_global/'
const customPropertiesPath = '../sass/00_global/';

// The desired file name of the custom properties file.
// Example: 'custom-props.css'
const customPropertiesFileName = 'custom-props.css';

// The location of the SCSS variables file. Relative to this directory.
// Example: '../sass/00_global/_01.generated-vars.scss'
const scssVariablesFile = '../sass/00_global/_01.generated-vars.scss';

// The location of the SCSS files to transform. Relative to this directory.

const scssFiles = '../sass/';

module.exports = {
  customPropertiesPath,
  customPropertiesFileName,
  scssVariablesFile,
  scssFiles,
};