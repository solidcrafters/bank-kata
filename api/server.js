const express = require('express')
const bodyParser = require('body-parser')

const accountManager = require('./account_manager')
const {creditAccount} = require('./account')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function setupApiServer (eventEmitter, manager = accountManager()) {
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
    const account = creditAccount(manager.getRegisteredAccount(req.body.name), req.body.amount)
    eventEmitter.emit('credit', account)
    res.send(account)
  })

  app.listen(3001, () => console.log('Example app listening on port 3001!'))
}

module.exports = setupApiServer
