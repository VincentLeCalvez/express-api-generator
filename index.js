const  { program } = require('commander')
const path = require('path')
const utils = require('./utils/utils') 
const { generateRouteImports, createCollections} = require('./utils/generate')
const { createDir } = require('./utils/utils')

program
  .option('-p, --port <type>', 'add the specified port', '3000')
  .option('-d, --dirName <type>', 'name of the generated folder', 'custom-api')
  .option('-u, --dbUrl <type', 'url db', 'mongodb://localhost:27017/api-design')
  .option('-c, --collections <type>', 'collections', utils.collect, ['data', 'users'])
 
program.parse(process.argv);

createdDir = utils.createDir(__dirname, program.dirName)

// PACKAGE FILE
packageFile = utils.readFile(path.join(__dirname, 'templates/package.json' ))
utils.createFile(path.join(createdDir, 'package.json'), packageFile)

// DB FILE
dbFile = utils.readFile(path.join(__dirname, 'templates/db.js' ))
utils.createFile(path.join(createdDir, 'db.js'), dbFile)

// CRUD FILE
crudFile = utils.readFile(path.join(__dirname, 'templates/crud.js' ))
utils.createFile(path.join(createdDir, 'crud.js'), crudFile)


// CONFIG FILE
configFile = utils.readFile(path.join(__dirname, 'templates/config.js' ))
configData = configFile
.replace(/__PORT__/g, program.port)
.replace(/__DBURL__/g, program.dbUrl)
utils.createFile(path.join(createdDir, 'config.js'), configData)


// SERVER FILE
requireStr = "const __router = require ('./collection/collection.router') \r\n"
useStr = "app.use('/collection', __router) \r\n"
serverFile = utils.readFile(path.join(__dirname, 'templates/server.js' ))
serverData = serverFile
.replace(/__ROUTES__/g, generateRouteImports(program.collections, requireStr))
.replace(/__USEROUTES__/g, generateRouteImports(program.collections, useStr))
utils.createFile(path.join(createdDir, 'server.js'), serverData)


createCollections(createdDir, program.collections)
 