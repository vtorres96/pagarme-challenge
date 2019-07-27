const express = require('express')

const ClientController = require('../controllers/ClientController')
const TransactionController = require('../controllers/TransactionController')

const routes = new express.Router()

// Clients
routes.get('/clients', ClientController.index)
routes.post('/clients', ClientController.create)

// Transactions
routes.get('/transactions', TransactionController.index)
routes.post('/transactions', TransactionController.create)

// Customer Balance Inquiries
routes.get('/clients/available/:id', TransactionController.balanceAvailable)
routes.get('/clients/waiting_funds/:id', TransactionController.balanceWaitingFunds)

module.exports = routes
