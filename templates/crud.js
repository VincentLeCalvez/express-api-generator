const { createPromptModule } = require("inquirer")

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

const createOne = model => async(req, res) => {
  try {
    const created = await model
    .create(req.body)

    res.status(200).json({data: created})
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

const crudControllers = model => ({
    getMany: getMany(model),
    createOne: createOne(model)
})

module.exports = {
    crudControllers
}