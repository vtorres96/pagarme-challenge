/* eslint-disable no-undef */
const { verifyPaymentMethod, calculatePaymentDate, calculateFee } = require('../../../src/helpers/payableHelper')
const moment = require('moment')

describe('Transaction Helper', () => {
  it('should return the status of the payable based on the transaction with debit card', () => {
    const paymentMethod = 'debit_card'
    const status = {
      statusPayable: 'paid',
      percentageFee: 0.03,
      amountDay: 0
    }

    const response = verifyPaymentMethod(paymentMethod)

    expect(response).toEqual(status)
  })

  it('should return the status of the payable based on the transaction with credit card', () => {
    const paymentMethod = 'credit_card'
    const status = {
      statusPayable: 'waiting_funds',
      percentageFee: 0.05,
      amountDay: 30
    }

    const response = verifyPaymentMethod(paymentMethod)

    expect(response).toEqual(status)
  })

  it('should be able to adding days to current date', () => {
    const days = 20
    const dateAddDays = moment().add(days, 'days').format('YYYY-MM-DD')
    const response = calculatePaymentDate(days)

    expect(response).toBe(dateAddDays)
  })

  it('should return the percentage rate of the transaction with debit card', () => {
    const amount = 1000
    const percentageFee = 0.03

    const response = calculateFee(amount, percentageFee)

    expect(response).toEqual(30)
  })

  it('should return the percentage rate of the transaction with credit card', () => {
    const amount = 1000
    const percentageFee = 0.05

    const response = calculateFee(amount, percentageFee)

    expect(response).toEqual(50)
  })
})
