const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    res.status(200).json({ data: doc })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

const createOne = model => async (req, res) => {
  try {
    const created = await model
      .create(req.body)

    res.status(200).json({ data: created })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

const updateOne = model => async (req, res) => {
  try {
    const doc = await model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .lean()
      .exec()

    if (!doc) {
      res.status(400).end()
    }
    res.status(200).json({ data: doc })
  } catch (e) {
    console.log(e)
    res.status(404).end()
  }
}

const removeOne = model => async (req, res) => {
  try {
    const doc = await model.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ data: doc })

    if (!doc) {
      res.status(400).end()
    }
  } catch (e) {
    console.log(e)
    res.status(404).end()
  }
}

const crudControllers = model => ({
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
})

module.exports = {
  crudControllers
}
