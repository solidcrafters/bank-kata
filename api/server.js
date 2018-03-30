const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const accountManager = require('./account_manager')
const {creditAccount} = require('./account')

function setupApiServer (app, eventEmitter, manager = accountManager()) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/api/status', (req, res) => res.send({status: 'OK'}))

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
  })

  app.post('/api/register', (req, res) => {
    const account = manager.registerAccount(req.body.name)
    eventEmitter.emit('register', account)
    res.send(account)
  })

  app.post('/api/credit', (req, res) => {
    console.log("Credit ->", req.body)
    const accountName = req.body.name
    const registeredAccount = manager.getRegisteredAccount(accountName)
    if (registeredAccount == null) {
      res.status(404).send(accountName + ' account does not exist')
    } else {
      const account = creditAccount(registeredAccount, req.body.amount)
      eventEmitter.emit('credit', account)
      res.send(account)
    }
  })
}

function setupWebSocketServer (server, eventEmitter) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {

    const send = type => account => {
      const event = {
        type,
        payload: {
          balance: account.balance,
          name: account.name
        }
      }
      ws.send(JSON.stringify(event))
    }

    eventEmitter.on('register', send('ACCOUNT_DECLARED'))

    eventEmitter.on('credit', send('ACCOUNT_CREDITED'))
  })
}

function setupServer (eventEmitter) {
  const app = express()
  const server = http.createServer(app);

  setupApiServer(app, eventEmitter)
  setupWebSocketServer(server, eventEmitter)

  server.listen(3001, () => console.log('Listening on %d', server.address().port))
}

module.exports = setupServer
