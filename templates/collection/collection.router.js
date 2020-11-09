const { Router } = require('express')
const { controllers } = require('./collection.controllers')

const router = Router()

router
    .route('/')
    .get(controllers.getMany)
    .post(controllers.createOne)

module.exports = router