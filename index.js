const utils = require('./utils') 
const  { program } = require('commander')
const path = require('path')
const config = require('./templates/config');

program
  .option('-p, --port <type>', 'add the specified port', '3000')
  .option('-d, --dirName <type>', 'name of the generated folder', 'custom-api')
  .option('-u, --dbUrl <type', 'url db', 'mongodb://localhost:27017/api-design')
 
program.parse(process.argv);

dir = utils.createDir(program.dirName)

serverFile = utils.readFile(path.join(__dirname, 'templates/server.js' ))
packageFile = utils.readFile(path.join(__dirname, 'templates/package.json' ))
dbFile = utils.readFile(path.join(__dirname, 'templates/db.js' ))
crudFile = utils.readFile(path.join(__dirname, 'templates/crud.js' ))



configFile = utils.readFile(path.join(__dirname, 'templates/config.js' ))
configData = configFile
.replace(/__PORT__/g, program.port)
.replace(/__DBURL__/g, program.dbUrl)


utils.createFile(path.join(dir, 'package.json'), packageFile)
utils.createFile(path.join(dir, 'server.js'), serverFile)
utils.createFile(path.join(dir, 'db.js'), dbFile)
utils.createFile(path.join(dir, 'crud.js'), crudFile)
utils.createFile(path.join(dir, 'config.js'), configData)

const srcDir = path.join(__dirname, 'templates/collection')
const tgtDir = path.join(dir, 'collection')

utils.copyDirectory(srcDir, tgtDir)
