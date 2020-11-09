const { Router } = require('express')
const { controllers } = require('./collection.controllers')

const router = Router()

router
    .route('/')
    .get(controllers.getMany)

module.exports = router