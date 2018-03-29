const events = require('events')
const eventEmitter = new events.EventEmitter()

const setupWebSocketServer = require('./ws')
const setupApiServer = require('./server')

setupApiServer(eventEmitter)
setupWebSocketServer(eventEmitter)
