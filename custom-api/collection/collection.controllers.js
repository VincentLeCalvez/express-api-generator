const { crudControllers } = require('../crud')
const Collection = require('./collection.model')

controllers = crudControllers(Collection)

module.exports = {controllers}

