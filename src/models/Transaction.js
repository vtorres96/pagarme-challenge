const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Valor da transação obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição obrigatória']
  },
  cardNumber: {
    type: Number,
    required: [true, 'Número do cartão obrigatório']
  },
  ownerName: {
    type: String,
    required: [true, 'Nome impresso no cartão obrigatório']
  },
  paymentMethod: {
    type: String,
    enum: ['debit_card', 'credit_card'],
    required: [true, 'Metódo de pagamento obrigatório']
  },
  cardExpirationDate: {
    type: String,
    required: [true, 'Data de validade obrigatória']
  },
  cardCvv: {
    type: Number,
    required: [true, 'CVV obrigatório']
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Transaction', TransactionSchema)
