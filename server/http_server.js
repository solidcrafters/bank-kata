const bodyParser = require('body-parser')
const express = require('express')
const path = require('path');

function setupApiServer (app, eventEmitter, accountStore) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(express.static(resolveClient()));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/api/status', (req, res) => res.send({status: 'OK'}))

  app.post('/api/account/register', (req, res) => {
    const account = accountStore.registerAccount(req.body.name)
    eventEmitter.emit('declare', account.toJson())
    res.send(account.toJson())
  })

  app.post('/api/account/unregister', (req, res) => {
    const accountName = req.body.name
    handle(res, accountName, account => {
      accountStore.unregisterAccount(accountName)
      eventEmitter.emit('undeclare', account.toJson())
      return true
    })
  })

  app.get('/api/account/', (req, res) => {
    handle(res, req.query.name, () => true)
  })

  app.post('/api/account/credit', (req, res) => {
    const accountName = req.body.name
    let amount = req.body.amount
    handle(res, accountName, account => {
      try {
        amount = account.credit(amount)
        eventEmitter.emit('credit', {name: accountName, amount})
        return true
      } catch (e) {
        eventEmitter.emit('request_error', {name: accountName, amount})
        return false
      }
    })
  })

  app.post('/api/account/debit', (req, res) => {
    const accountName = req.body.name
    let amount = req.body.amount
    handle(res, accountName, account => {
      try {
        amount = account.debit(amount)
        eventEmitter.emit('debit', {name: accountName, amount})
        return true
      } catch (e) {
        eventEmitter.emit('request_error', {name: accountName, amount})
        return false
      }
    })
  })

  app.post('/api/account/transfer', (req, res) => {
    const fromAccountName = req.body.from
    const toAccountName = req.body.to
    let amount = req.body.amount
    handle(res, toAccountName, toAccount => {
      handle(res, fromAccountName, fromAccount => {
        try {
          amount = fromAccount.debit(amount)
          toAccount.credit(amount, true)
          eventEmitter.emit('transfer', {from: fromAccountName, to: toAccountName, amount})
          return true
        } catch (e) {
          eventEmitter.emit('request_error', {name: fromAccountName, amount})
          return false
        }
      })
    })
  })

  app.get('*', function(request, response) {
    response.sendFile(resolveClient('index.html'));
  });

  function handle (res, accountName, handler) {
    const registeredAccount = accountStore.getRegisteredAccount(accountName)
    if (registeredAccount == null) {
      res.status(404).send(accountName + ' account does not exist')
      return false
    } else {
      if (handler(registeredAccount)) {
        res.send(registeredAccount.toJson())
      } else {
        res.status(400).send()
      }
    }
  }
}

function resolveClient (file = '') {
  return path.resolve(__dirname, '../react-ui/build', file)
}

module.exports = setupApiServer
