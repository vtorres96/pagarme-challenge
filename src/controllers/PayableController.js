const Payable = require('../models/Payable')

module.exports = {
  async index (req, res) {
    try {
      const payables = await Payable.find()
      return res.json(payables)
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  async create (req, res) {
    try {
      const { status, paymentDate, fee, transactionId } = req.body

      const payable = await Payable.create({
        status,
        paymentDate,
        fee,
        transactionId
      })

      return res.json(payable)
    } catch (error) {
      return res.send(400).json(error)
    }
  }
}
