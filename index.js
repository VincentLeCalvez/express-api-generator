const utils = require('./utils') 
const { generateRouteImports, createCollections} = require('./generate')
const  { program } = require('commander')
const path = require('path')
const config = require('./templates/config');
const { collection } = require('./templates/collection/collection.model');


program
  .option('-p, --port <type>', 'add the specified port', '3000')
  .option('-d, --dirName <type>', 'name of the generated folder', 'custom-api')
  .option('-u, --dbUrl <type', 'url db', 'mongodb://localhost:27017/api-design')
  .option('-c, --collections <type>', 'collections', utils.collect, ['data', 'users'])
 
program.parse(process.argv);

dir = utils.createDir(program.dirName)

// PACKAGE FILE
packageFile = utils.readFile(path.join(__dirname, 'templates/package.json' ))
utils.createFile(path.join(dir, 'package.json'), packageFile)

// DB FILE
dbFile = utils.readFile(path.join(__dirname, 'templates/db.js' ))
utils.createFile(path.join(dir, 'db.js'), dbFile)

// CRUD FILE
crudFile = utils.readFile(path.join(__dirname, 'templates/crud.js' ))
utils.createFile(path.join(dir, 'crud.js'), crudFile)


// CONFIG FILE
configFile = utils.readFile(path.join(__dirname, 'templates/config.js' ))
configData = configFile
.replace(/__PORT__/g, program.port)
.replace(/__DBURL__/g, program.dbUrl)
utils.createFile(path.join(dir, 'config.js'), configData)


// SERVER FILE
requireStr = "const __router = require ('./collection/collection.router') \r\n"
useStr = "app.use('/collection', __router) \r\n"
serverFile = utils.readFile(path.join(__dirname, 'templates/server.js' ))
serverData = serverFile
.replace(/__ROUTES__/g, generateRouteImports(program.collections, requireStr))
.replace(/__USEROUTES__/g, generateRouteImports(program.collections, useStr))
utils.createFile(path.join(dir, 'server.js'), serverData)


createCollections(program.dirName, program.collections)
 