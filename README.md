# pagarme-challenge
This is the test for the software backend engineer.

It was developed API with Node.JS in backend.

Repository used as reference: https://github.com/pagarme/vagas/tree/master/desafios/software-engineer-backend

See it working: https://github.com/vtorres96/pagarme-challenge

## How to install and run application

In order to facilitate the tests, I kept the connection string

### yarn
```sh
$ yarn
$ yarn dev
```

### npm
```sh
$ npm install
$ npm run start
```

### tests
```sh
$ yarn test
```
```sh
$ npm test
```

### Listening port on 3030
```sh
$ http://localhost:3030/
```

## Customers

### Create Customer
To create a customer simply access the route `/clients` by the POST method 
and enter the data of the customer you want to create. Example:
```sh
{name: 'Test', email: 'test@example.com', password: 'testpassword'}
```

### Listing All Customers
To list all customers simply access the route `/clients` by the GET method.

## Transactions

### Create Transaction
To create a transaction simply access the route `/transactions` by the POST method and enter the data of the transaction you want to create. Example:
```sh
{amount: 1000, description: 'test transaction', cardNumber: 1234567891234567, ownerName: 'Weberson Full Stack', paymentMethod: 'debit_card', cardExpirationDate: '2020-02', cardCvv: 157, clientId: '5d24172c5a51e96d134e6190'}
```

### Listing All Transactions
To list all transactions simply access the route `/transactions` by the GET method.

### General Observations About The Transactions
The transaction must be linked to a customer.
The payables do not have routes because they are created from an effected transaction, and linked to the ID of that transaction.

## Customer Balance Inquiries

### Balance Available
To access the customer's available balance and view what he has already received, simply access the `/clients/available/:id` route where you need to replace `:id` with a customer ID. Example with a valid customer ID:
```sh
/clients/available/5d24172c5a51e96d134e6190
```

### Balance Waiting Funds
To access the customer's available balance and view what it will receive, simply access the `/clients/wating_funds/:id` route where you need to replace `:id` with a customer ID. Example with a valid customer ID:
```sh
/clients/waiting_funds/5d24172c5a51e96d134e6190
```

## Structure
The basic structure of this challenge is given in the following way:

`node_modules/` Contains all dependencies fetched via NPM. However, this directory is unnecessary for versioning, so it is ignored.

`.gitignore` The .gitignore file specifies intentionally untracked files that Git should ignore.

`package.json` Lists all Node.js dependencies.

`README.md` Explains how your application works.
