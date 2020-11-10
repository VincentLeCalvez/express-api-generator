const utils = require('./utils') 
const  { program } = require('commander')
const path = require('path')
const config = require('./templates/config');
const { collection } = require('./templates/collection/collection.model');

function collect(value, previous) {
  return previous.concat([value]);
}


program
  .option('-p, --port <type>', 'add the specified port', '3000')
  .option('-d, --dirName <type>', 'name of the generated folder', 'custom-api')
  .option('-u, --dbUrl <type', 'url db', 'mongodb://localhost:27017/api-design')
  .option('-c, --collections <type>', 'collections', collect, ['data', 'users'])
 
program.parse(process.argv);

dir = utils.createDir(program.dirName)

packageFile = utils.readFile(path.join(__dirname, 'templates/package.json' ))
dbFile = utils.readFile(path.join(__dirname, 'templates/db.js' ))
crudFile = utils.readFile(path.join(__dirname, 'templates/crud.js' ))


// CONFIG FILE
configFile = utils.readFile(path.join(__dirname, 'templates/config.js' ))
configData = configFile
.replace(/__PORT__/g, program.port)
.replace(/__DBURL__/g, program.dbUrl)

// SERVER FILE
const generateRouteImports =(collections, srcStr) => {
  // maybe reduce
  str = ''
  for(var i = 0; i < collections.length; i ++) {
    tgtStr = srcStr
    .replace(/__router/g, collections[i] + "Router")
    .replace(/collection/g, collections[i])
    str = str + tgtStr
  }
  return str
}

requireStr = "const __router = require ('./collection/collection.router') \r\n"
useStr = "app.use('/collection', __router) \r\n"
serverFile = utils.readFile(path.join(__dirname, 'templates/server.js' ))
serverData = serverFile
.replace(/__ROUTES__/g, generateRouteImports(program.collections, requireStr))
.replace(/__USEROUTES__/g, generateRouteImports(program.collections, useStr))


utils.createFile(path.join(dir, 'package.json'), packageFile)
utils.createFile(path.join(dir, 'db.js'), dbFile)
utils.createFile(path.join(dir, 'crud.js'), crudFile)
utils.createFile(path.join(dir, 'config.js'), configData)
utils.createFile(path.join(dir, 'server.js'), serverData)


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const createCollections = (collections) => {
  for(var i = 0; i < collections.length; i++) {
  const srcDir = path.join(__dirname, 'templates/collection')
  const tgtDir = path.join(dir, collections[i])


  utils.createDir(path.join(program.dirName, collections[i]))

  routerFile = utils.readFile(path.join(srcDir, 'collection.router.js' ))
  routerData = routerFile
  .replace(/collection/g, collections[i])
  .replace(/Collections/g, collections[i].capitalize())

  controllerFile = utils.readFile(path.join(srcDir, 'collection.controllers.js' ))
  controllerData = controllerFile
  .replace(/collection/g, collections[i])
  .replace(/Collections/g, collections[i].capitalize())

  modelFile = utils.readFile(path.join(srcDir, 'collection.model.js'  ))
  modelData = modelFile
  .replace(/collection/g, collections[i])
  .replace(/Collection/g, collections[i].capitalize())

  utils.createFile(path.join(tgtDir, collections[i] + '.router.js'), routerData)
  utils.createFile(path.join(tgtDir, collections[i] + '.controllers.js'), controllerData)
  utils.createFile(path.join(tgtDir, collections[i] + '.model.js'), modelData)

  }

  //const router = require ('./collection/collection.router')

  //app.use('/collection', router)

}

createCollections(program.collections)
 