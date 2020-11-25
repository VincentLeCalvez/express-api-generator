const questions = [
  {
    type: 'input',
    name: 'port',
    message: 'Choose a port',
    default: '3000'
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Choose a project name',
    default: 'custom-api'
  },
  {
    type: 'input',
    name: 'dbUrl',
    message: 'url of database'
  },
  {
    type: 'input',
    name: 'collections',
    message: 'name of collections (separate with space)'
  }
]

module.exports = questions
