const express = require('express')
const multer = require('multer')

const ClientController = require('../controllers/ClientController')
const TransactionController = require('../controllers/TransactionController')

const routes = new express.Router()
const upload = multer({ dest: './' })

// Clients
routes.get('/clients', ClientController.index);
routes.post('/clients', upload.single('optmize'), ClientController.create);

// Transactions
routes.get('/transactions', TransactionController.index);
routes.post('/transactions', upload.single('optmize'), TransactionController.create);

// Customer Balance Inquiries
routes.get('/clients/available/:id', TransactionController.balanceAvailable);
routes.get('/clients/waiting_funds/:id', TransactionController.balanceWaitingFunds);

module.exports = routes