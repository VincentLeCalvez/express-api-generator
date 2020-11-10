const utils = require('./utils')
const path = require('path')

//TODO optimize
const replace = (file, collection) => {
    return file
    .replace(/collection/g, collection)
    .replace(/Collection/g, collection.charAt(0).toUpperCase() + collection.slice(1))
}

const createCollections = (dirName, collections) => {
    for(var i = 0; i < collections.length; i++) {
    const srcDir = path.join(__dirname, 'templates/collection')
    const tgtDir = path.join(dir, collections[i])
  
    utils.createDir(path.join(dirName, collections[i]))
    
    // ROUTER FILE 
    routerFile = utils.readFile(path.join(srcDir, 'collection.router.js' ))
    routerData = replace(routerFile, collections[i])
    utils.createFile(path.join(tgtDir, collections[i] + '.router.js'), routerData)

    // CONTROLLERS FILE
    controllerFile = utils.readFile(path.join(srcDir, 'collection.controllers.js' ))
    controllerData = replace(controllerFile, collections[i])
    utils.createFile(path.join(tgtDir, collections[i] + '.controllers.js'), controllerData)

    // MODEL FILE
    modelFile = utils.readFile(path.join(srcDir, 'collection.model.js'  ))
    modelData = replace(modelFile, collections[i])
    utils.createFile(path.join(tgtDir, collections[i] + '.model.js'), modelData)
  
    }
  }

  // TODO find better names for parameters 
  const generateRouteImports =(collections, srcImports) => {
    return collections.reduce((acc, collection) => {
        tgtStr = srcImports
        .replace(/__router/g, collection + "Router")
        .replace(/collection/g, collection)

        return acc = acc + tgtStr
    }, '')
  }

  module.exports = {
      createCollections,
      generateRouteImports
  }
  