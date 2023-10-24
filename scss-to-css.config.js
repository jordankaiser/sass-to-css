// The folder to output the custom properties file to. Relative to this directory.
// const customPropertiesPath = 'variables';
const customPropertiesPath = '../sass/00_global';

// The desired file name of the custom properties file.
const customPropertiesFileName = 'custom-props.css';

// The location of the SCSS variables file. Relative to this directory.
// const scssVariablesFile = 'variables/index.scss';
const scssVariablesFile = '../sass/00_global/_01.generated-vars.scss';

// The location of the SCSS files to transform. Relative to this directory.
// const scssFiles = 'files';
const scssFiles = '../sass/';

// Directores to be ignored. If no directories are to be ignored put an empty array.
// TODO: Write comment out more once this is implemented.
// const ignoreDirectories = [];
const ignoreDirectories = ['../sass/lib/**', '../sass/style.scss', '../sass/select2-theme.scss', '../sass/00_global/_01.generated-vars.scss', '../sass/lib/bourbon/**', '../sass/lib/neat/**', '../sass/lib/slick/fonts/**', , '../sass/lib/slick/ajax-loader.gif'];

// The compiled CSS file. Relative to this directory.
// const cssFile = 'dist/index.css';
const cssFile = '../css/select2-theme.css';

module.exports = {
  customPropertiesPath,
  customPropertiesFileName,
  scssVariablesFile,
  scssFiles,
  ignoreDirectories,
  cssFile,
};