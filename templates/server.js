const express = require('express')
const { connect } = require('./db.js')
const config = require('./config')
const router = require ('./collection/collection.router')
const { json, urlencoded } = require('body-parser')

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/collection', router)
 
const start = async() => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log('listening on port ' + config.port)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
 