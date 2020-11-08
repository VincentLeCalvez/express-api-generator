const utils = require('./utils') 
const  { program } = require('commander')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

program
  .option('-p, --port <type>', 'add the specified port', '3000')
  .option('-d, --dirName <type>', 'name of the generated folder', 'custom-api-' + uuidv4());
 
program.parse(process.argv);

dir = utils.createDir(program.dirName)

serverFile = utils.readFile(path.join(__dirname, 'templates/server.js' ))
packageFile = utils.readFile(path.join(__dirname, 'templates/package.json' ))

serverData = serverFile.replace(/__PORT__/g, program.port)

utils.createFile(path.join(dir, 'package.json'), packageFile)
utils.createFile(path.join(dir, 'server.js'), serverData)