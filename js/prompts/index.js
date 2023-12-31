const prompts = require('prompts');

/**
 *  Ask questions using the command line.
 *
 * @param {string} type - The question type.
 * @return {boolean} Whether the answer is true or false.
 */
async function question(type) {
  let questions = false;
  switch (type) {
    case 'begin':
      questions = {
        type: 'select',
        name: 'value',
        message: 'This will change text in your files. Ensure you have committed your work. Continue?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: false },
        ],
        initial: 0
      }
      break;
    case 'replace':
      questions = {
        type: 'select',
        name: 'value',
        message: 'Replace your SCSS variables with CSS custom properties?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: false },
        ],
        initial: 0
      }
      break;
    case 'create':
      questions = {
        type: 'select',
        name: 'value',
        message: 'Create a CSS custom properties file from your SCSS variables?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: false },
        ],
        initial: 0
      }
      break;
  
    case 'addComments':
      questions = {
        type: 'select',
        name: 'value',
        message: 'Add comments to your SCSS files?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: false },
        ],
        initial: 0
      }
      break;

    case 'createCSS':
      questions = {
        type: 'select',
        name: 'value',
        message: 'Create CSS files?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: false },
        ],
        initial: 0
      }
      break;
      
    default:
      break;
  }

  // Assume true for all questions if we can't ask the user.
  let response = {value: true};

  // If we have questions start asking them.
  if (questions) {

    // Update response with answers.
    response = await prompts(questions);
  }

  return new Promise((resolve) => {
    try {
      resolve(response.value);
    } catch(error) {
      console.log(error)
    }
  });
};

module.exports = question;