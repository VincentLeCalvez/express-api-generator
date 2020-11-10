const express = require('express')
const { json, urlencoded } = require('body-parser')
const { connect } = require('./db.js')
const config = require('./config')

__ROUTES__

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

__USEROUTES__
 
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
 