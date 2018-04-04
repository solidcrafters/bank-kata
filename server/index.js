const events = require('events')
const express = require('express')
const http = require('http')

const accountManager = require('./account_manager')
const setupApiServer = require('./http_server')
const setupWebSocketServer = require('./ws_server')

const eventEmitter = new events.EventEmitter()
const app = express()
const server = http.createServer(app)
const accountStore = accountManager()

setupApiServer(app, eventEmitter, accountStore)

setupWebSocketServer(server, eventEmitter, accountStore)

server.listen(process.env.PORT || 5000, () => console.log('Listening on %d', server.address().port))
