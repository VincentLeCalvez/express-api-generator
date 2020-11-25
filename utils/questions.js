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
    message: 'url of database',
    default: 'mongodb://localhost:27017/api'
  },
  {
    type: 'input',
    name: 'collections',
    message: 'name of collections (separate with space)',
    default: 'data'
  }
]

module.exports = questions
