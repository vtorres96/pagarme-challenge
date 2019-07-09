/* eslint-disable no-undef */
const { getLastFourNumbers } = require('../../../src/helpers/transactionHelper')

describe('Transaction Helper', () => {
  it('should be able to capture the last four numbers', () => {
    const cardNumber = 1234567891234567

    const response = getLastFourNumbers(cardNumber)

    expect(response).toEqual(4567)
  })
})
