const express = require('express')
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const { connect } = require('./db.js')
const config = require('./config')

__ROUTES__

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

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
 