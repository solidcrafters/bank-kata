const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const accountManager = require('./account_manager')
const {ACCOUNT_CREDITED, ACCOUNT_DEBITED, ACCOUNT_DECLARED, ACCOUNT_UNDECLARED, AMOUNT_TRANSFERRED} = require('../commons/constants')

function setupApiServer (app, eventEmitter, accountStore) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/api/status', (req, res) => res.send({status: 'OK'}))

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html')
  })

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
    const amount = req.body.amount
    handle(res, accountName, account => {
      account.credit(amount)
      eventEmitter.emit('credit', {name: accountName, amount})
      return true
    })
  })

  app.post('/api/account/debit', (req, res) => {
    const accountName = req.body.name
    const amount = req.body.amount
    handle(res, accountName, account => {
      account.debit(amount)
      eventEmitter.emit('debit', {name: accountName, amount})
      return true
    })
  })

  app.post('/api/account/transfer', (req, res) => {
    const fromAccountName = req.body.from
    const toAccountName = req.body.to
    const amount = req.body.amount
    handle(res, fromAccountName, fromAccount => {
      handle(res, toAccountName, toAccount => {
        fromAccount.debit(amount)
        toAccount.credit(amount)
        eventEmitter.emit('transfer', {from: fromAccountName, to: toAccountName, amount})
        return true
      })
    })
  })

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

function setupWebSocketServer (server, eventEmitter, accountStore) {
  const wss = new WebSocket.Server({server})

  wss.on('connection', ws => {
    const send = type => payload => {
      const event = {
        type,
        payload
      }
      try {
        ws.send(JSON.stringify(event))
      } catch (error) {
        console.log('Error when sending the event to the ws', error)
      }
    }

    eventEmitter.on('declare', send(ACCOUNT_DECLARED))

    eventEmitter.on('undeclare', send(ACCOUNT_UNDECLARED))

    eventEmitter.on('credit', send(ACCOUNT_CREDITED))

    eventEmitter.on('debit', send(ACCOUNT_DEBITED))

    eventEmitter.on('transfer', send(AMOUNT_TRANSFERRED))

    const registeredAccounts = accountStore.getRegisteredAccounts()
    for (let account in registeredAccounts) {
      if (registeredAccounts.hasOwnProperty(account)) {
        send(ACCOUNT_DECLARED)(registeredAccounts[account].toJson())
      }
    }
  })
}

function setupServer (eventEmitter) {
  const app = express()
  const server = http.createServer(app)
  const accountStore = accountManager()

  setupApiServer(app, eventEmitter, accountStore)
  setupWebSocketServer(server, eventEmitter, accountStore)

  server.listen(8080, () => console.log('Listening on %d', server.address().port))
}

module.exports = setupServer
