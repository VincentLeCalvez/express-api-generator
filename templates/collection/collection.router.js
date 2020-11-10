const { Router } = require('express')
const { controllers } = require('./collection.controllers')

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

module.exports = router
