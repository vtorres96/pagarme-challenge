const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

class App {
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
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${
      process.env.DB_PASS
    }@cluster0-bfkrt.mongodb.net/${
      process.env.DB_NAME
    }?retryWrites=true&w=majority`, {
      useNewUrlParser: true
    })
  }

  routes () {
    this.express.use(require('./routes/routes'))
  }
}

module.exports = new App().express
