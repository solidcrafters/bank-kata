const events = require('events')
const eventEmitter = new events.EventEmitter()

const setupServer = require('./server')

setupServer(eventEmitter)
