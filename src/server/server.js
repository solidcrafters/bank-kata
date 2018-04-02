const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const accountManager = require('./account_manager')
const {ACCOUNT_CREDITED, ACCOUNT_DEBITED, ACCOUNT_DECLARED} = require('../commons/constants')

function setupApiServer (app, eventEmitter, accountStore) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/api/status', (req, res) => res.send({status: 'OK'}))

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
  })

  app.post('/api/account/register', (req, res) => {
    const account = accountStore.registerAccount(req.body.name)
    eventEmitter.emit('register', account)
    res.send(account.toJson())
  })

  app.get('/api/account/', (req, res) => {
    handle(res, req.query.name)
  })

  app.post('/api/account/credit', (req, res) => {
    handle(res, req.body.name, account => {
      account.credit(req.body.amount)
      eventEmitter.emit('credit', account)
    })
  })

  app.post('/api/account/debit', (req, res) => {
    handle(res, req.body.name, account => {
      account.debit(req.body.amount)
      eventEmitter.emit('debit', account)
    })
  })

  function handle (res, accountName, handler) {
    const registeredAccount = accountStore.getRegisteredAccount(accountName)
    if (registeredAccount == null) {
      res.status(404).send(accountName + ' account does not exist')
    } else {
      handler && handler(registeredAccount)
      res.send(registeredAccount.toJson())
    }
  }
}

function setupWebSocketServer (server, eventEmitter, accountStore) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {

    const send = type => account => {
      const event = {
        type,
        payload: account.toJson()
      }
      try {
        ws.send(JSON.stringify(event))
      } catch (error) {
        console.log('Error when sending the event to the ws', error)
      }
    }

    eventEmitter.on('register', send(ACCOUNT_DECLARED))

    eventEmitter.on('credit', send(ACCOUNT_CREDITED))

    eventEmitter.on('debit', send(ACCOUNT_DEBITED))
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
