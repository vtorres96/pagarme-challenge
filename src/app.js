const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

class AppController {
  constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(express.json())
  }

  database () {
    mongoose.connect(`mongodb+srv://vtorres96:03V01t96m.@cluster0-bfkrt.mongodb.net/pagarme-challenge?retryWrites=true&w=majority`, {
      useNewUrlParser: true
    })
  }

  routes () {
    this.express.use(require('./routes/routes'))
  }
}

module.exports = new AppController().express
