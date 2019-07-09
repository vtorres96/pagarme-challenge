const Payable = require('../models/Payable')

const { verifyPaymentMethod, calculatePaymentDate, calculateFee } = require('../helpers/payableHelper')
class PayableService {
  async store (transaction) {
    try {
      const { _id: transactionId, amount, paymentMethod } = transaction

      verifyPaymentMethod(paymentMethod)

      return await Payable.create({
        status: [status],
        paymentDate: calculatePaymentDate(status.amountDay),
        fee: calculateFee(amount, status.percentageFee),
        transactionId: transactionId
      })
    } catch (error) {
      throw error
    }
  }
}

module.exports = PayableService
