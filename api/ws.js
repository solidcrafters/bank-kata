const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: 40510})

function setupWebSocketServer (eventEmitter) {
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

module.exports = setupWebSocketServer
