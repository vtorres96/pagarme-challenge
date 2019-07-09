const Transaction = require('../models/Transaction')
const PayableService = require('../services/payableService')

const ValidationContract = require('../validators/validator')
const { getLastFourNumbers } = require('../helpers/transactionHelper')

module.exports = {
  async index (req, res) {
    try {
      const transactions = await Transaction.find()

      return res.json(transactions)
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  async create (req, res) {
    let contract = new ValidationContract()

    contract.isRequired(req.body.amount, 'Valor da transação não informado')
    contract.isRequired(req.body.description, 'Descrição da transação não informada')
    contract.isRequired(req.body.cardNumber, 'Número do cartão não informado')
    contract.isRequired(req.body.ownerName, 'Nome impresso no cartão não informado')
    contract.isRequired(req.body.paymentMethod, 'Método de pagamento não informado')
    contract.isRequired(req.body.cardExpirationDate, 'Data de validade do cartão não informada')
    contract.isRequired(req.body.cardCvv, 'Código de verificação do cartão não informado')
    contract.isRequired(req.body.clientId, 'Esta transação precisa estar vinculada a um cliente')

    contract.hasMinLen(req.body.amount, 3, 'O valor da transação deve conter ao menos 3 caracteres')
    contract.hasMaxLen(req.body.description, 100, 'A descrição da transação possui um limite de até 100 caracteres')
    contract.hasMinLen(req.body.cardNumber, 15, 'O código de verificação do cartão deve conter ao menos 15 caracteres')
    contract.hasMaxLen(req.body.cardNumber, 16, 'O código de verificação do cartão possui um limite de até 16 caracteres')
    contract.hasMaxLen(req.body.ownerName, 60, 'O nome impresso no cartão possui um limite de até 60 caracteres')
    contract.hasMinLen(req.body.cardCvv, 3, 'O código de verificação do cartão deve conter ao menos 3 caracteres')
    contract.hasMaxLen(req.body.cardCvv, 4, 'O código de verificação do cartão possui um limite de até 4 caracteres')

    // If Data Invalid
    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end()
      return
    }

    try {
      req.body.cardNumber = getLastFourNumbers(req.body.cardNumber)

      const {
        amount,
        description,
        cardNumber,
        ownerName,
        paymentMethod,
        cardExpirationDate,
        cardCvv,
        clientId
      } = req.body

      const transaction = await Transaction.create({
        amount,
        description,
        cardNumber,
        ownerName,
        paymentMethod,
        cardExpirationDate,
        cardCvv,
        clientId
      })

      const payableService = new PayableService()
      await payableService.store(transaction)

      return res.json(transaction)
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  async balanceAvailable (req, res) {
    const id = req.params.id

    const transactions = await Transaction.find({
      clientId: id, paymentMethod: 'debit_card'
    }, 'amount description paymentMethod')

    transactions.map((transaction) => {
      transaction.amount = transaction.amount - (transaction.amount * 0.03)
      return transaction.amount
    })

    return res.json(transactions)
  },

  async balanceWaitingFunds (req, res) {
    const id = req.params.id

    const transactions = await Transaction.find({
      clientId: id, paymentMethod: 'credit_card'
    }, 'amount description paymentMethod')

    transactions.map((transaction) => {
      transaction.amount = transaction.amount - (transaction.amount * 0.05)
      return transaction.amount
    })

    return res.json(transactions)
  }
}
