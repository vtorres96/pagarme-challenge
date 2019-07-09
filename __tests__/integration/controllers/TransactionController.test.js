/* eslint-disable no-undef */
const app = require('../../../src/app')
const request = require('supertest')

describe('Transaction Controller', () => {
  it('should be able to create transaction', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        amount: 12000,
        description: 'test transaction',
        cardNumber: 1234567891234567,
        ownerName: 'Weberson Full Stack',
        paymentMethod: 'debit_card',
        cardExpirationDate: '2020-02',
        cardCvv: 157,
        clientId: '5d24172c5a51e96d134e6190'
      })

    expect(response.status).toBe(200)
  })

  it('should be able to find all transactions', async () => {
    const response = await request(app)
      .get('/transactions')

    expect(response.status).toBe(200)
  })

  it('should be able to find all customer transactions made on the debit card', async () => {
    const response = await request(app)
      .get('/clients/available/5d23e777d7d2bb561f1aa405')

    expect(response.status).toBe(200)
  })

  it('should be able to find all customer transactions made on the credit card', async () => {
    const response = await request(app)
      .get('/clients/waiting_funds/5d23e777d7d2bb561f1aa405')

    expect(response.status).toBe(200)
  })
})
