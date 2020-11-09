
 const getMany = model => async (req, res) => {
  try {
      console.log(model)
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

const crudControllers = model => ({
    getMany: getMany(model)
})

module.exports = {
    crudControllers
}