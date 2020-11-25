const { prompt } = require('inquirer')
const path = require('path')
const utils = require('./utils/utils')
const { generateRouteImports, createCollections } = require('./utils/generate')
const questions = require('./utils/questions')

prompt(questions).then(answers => {
  const projectName = answers.projectName
  const port = answers.port
  const dbUrl = answers.dbUrl
  const collections = answers.collections.split(' ')

  const createdDir = utils.createDir(__dirname, projectName)

  // PACKAGE FILE
  const packageFile = utils.readFile(path.join(__dirname, 'templates/package.json'))
  utils.createFile(path.join(createdDir, 'package.json'), packageFile)

  // DB FILE
  const dbFile = utils.readFile(path.join(__dirname, 'templates/db.js'))
  utils.createFile(path.join(createdDir, 'db.js'), dbFile)

  // CRUD FILE
  const crudFile = utils.readFile(path.join(__dirname, 'templates/crud.js'))
  utils.createFile(path.join(createdDir, 'crud.js'), crudFile)

  // CONFIG FILE
  const configFile = utils.readFile(path.join(__dirname, 'templates/config.js'))
  const configData = configFile
    .replace(/__PORT__/g, port)
    .replace(/__DBURL__/g, dbUrl)
  utils.createFile(path.join(createdDir, 'config.js'), configData)

  // SERVER FILE
  const requireStr = "const __router = require ('./collection/collection.router') \r\n"
  const useStr = "app.use('/collection', __router) \r\n"
  const serverFile = utils.readFile(path.join(__dirname, 'templates/server.js'))
  const serverData = serverFile
    .replace(/__ROUTES__/g, generateRouteImports(collections, requireStr))
    .replace(/__USEROUTES__/g, generateRouteImports(collections, useStr))
  utils.createFile(path.join(createdDir, 'server.js'), serverData)

  createCollections(createdDir, collections)
}
)
