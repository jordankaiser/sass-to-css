const prompts = require('prompts');

async function question(type) {
  let configuration = false;
  switch (type) {
    case 'begin':
      console.log('begin');
      configuration = {
        type: 'select',
        name: 'value',
        message: 'This will change text in your files. Ensure you have committed your work. Continue?',
        choices: [
          { title: 'Yes', description: 'This option has a description', value: true },
          { title: 'No', description: 'This option has a description', value: false },
        ],
        initial: 1
      }
      break;
    case 'end':
      console.log('end');
      break;
  
    default:
      break;
  }
  const response = await prompts(configuration);

  return new Promise((resolve) => {
    try {
      resolve(response);
    } catch(error) {
      console.log(error)
    }
  });
  
  console.log(response.value);
};

module.exports = question;