// The folder to output the custom properties file to. Relative to this directory.
// LVHN: '../sass/00_global'
const customPropertiesPath = 'variables';

// The desired file name of the custom properties file.
// LVHN: 'custom-props.css'
const customPropertiesFileName = 'custom-props.css';

// The location of the SCSS variables file. Relative to this directory.
// LVHN: '../sass/00_global/_01.generated-vars.scss'
const scssVariablesFile = 'variables/index.scss';

// The location of the SCSS files to transform. Relative to this directory.
// LVHN: ../sass/
const scssFiles = 'files';

// Directores to be ignored. If no directories are to be ignored put an empty array.
// TODO: Write comment out more once this is implemented.
// LVHN ignores: ['../sass/lib/**', '../sass/print/**', '../sass/select2-theme/**', '../sass/style.scss', '../sass/select2-theme.scss', '../sass/00_global/_01.generated-vars.scss']
const ignoreDirectories = [];

module.exports = {
  customPropertiesPath,
  customPropertiesFileName,
  scssVariablesFile,
  scssFiles,
  ignoreDirectories,
};