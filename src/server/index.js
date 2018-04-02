const events = require('events')
const setupServer = require('./server')

const eventEmitter = new events.EventEmitter()

setupServer(eventEmitter)
