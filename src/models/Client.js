const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome obrigatório']
  },
  email: {
    type: String,
    required: [true, 'Email obrigatório']
  },
  password: {
    type: String,
    required: [true, 'Senha obrigatório']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Client', ClientSchema)
