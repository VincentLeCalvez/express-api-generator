const utils = require('./utils')
const path = require('path')

const createCollections = (createdDir, collections) => {
  for (let i = 0; i < collections.length; i++) {
    // TODO -- get srcDir path by another mean
    const srcDir = path.join(path.dirname(createdDir), 'templates', 'collection')
    const tgtDir = path.join(createdDir, collections[i])

    utils.createDir(createdDir, collections[i])

    // ROUTER FILE
    const routerFile = utils.readFile(path.join(srcDir, 'collection.router.js'))
    const routerData = replace(routerFile, collections[i])
    utils.createFile(path.join(tgtDir, collections[i] + '.router.js'), routerData)

    // CONTROLLERS FILE
    const controllerFile = utils.readFile(path.join(srcDir, 'collection.controllers.js'))
    const controllerData = replace(controllerFile, collections[i])
    utils.createFile(path.join(tgtDir, collections[i] + '.controllers.js'), controllerData)

    // MODEL FILE
    const modelFile = utils.readFile(path.join(srcDir, 'collection.model.js'))
    const modelData = replace(modelFile, collections[i])
    utils.createFile(path.join(tgtDir, collections[i] + '.model.js'), modelData)
  }
}

// TODO find better names for parameters
const generateRouteImports = (collections, srcImports) => {
  return collections.reduce((acc, collection) => {
    const tgtStr = srcImports
      .replace(/__router/g, collection + 'Router')
      .replace(/collection/g, collection)

    return acc + tgtStr
  }, '')
}

// TODO optimize
const replace = (file, collection) => {
  return file
    .replace(/collection/g, collection)
    .replace(/Collection/g, collection.charAt(0).toUpperCase() + collection.slice(1))
}

module.exports = {
  createCollections,
  generateRouteImports
}
