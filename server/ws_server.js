const WebSocket = require('ws')

const {
  ACCOUNT_CREDITED,
  ACCOUNT_DEBITED,
  ACCOUNT_DECLARED,
  ACCOUNT_UNDECLARED,
  AMOUNT_TRANSFERRED,
  REQUEST_FORBIDDEN
} = require('../react-ui/src/commons/constants')

function setupWebSocketServer (server, eventEmitter, accountStore) {
  const wss = new WebSocket.Server({server})

  function noop() {}

  function heartbeat() {
    this.isAlive = true;
  }

  wss.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    const send = (type, payload) => {
      const event = {
        type,
        payload
      }
      try {
        if (ws.isAlive) {
          ws.send(JSON.stringify(event))
        }
      } catch (error) {
        console.error('Error when sending the event to the ws', error)
      }
    }

    const sendAccountDeclared = payload => send(ACCOUNT_DECLARED, payload)
    const sendAccountUnDeclared = payload => send(ACCOUNT_UNDECLARED, payload)
    const sendAccountCredited = payload => send(ACCOUNT_CREDITED, payload)
    const sendRequestForbidden = payload => send(REQUEST_FORBIDDEN, payload)
    const sendAccountDebited = payload => send(ACCOUNT_DEBITED, payload)
    const sendAccountTransferred = payload => send(AMOUNT_TRANSFERRED, payload)

    registerListeners()
    initialize()
    ws.on('close', unregisterListeners)

    function registerListeners() {
      eventEmitter.on('declare', sendAccountDeclared)
      eventEmitter.on('undeclare', sendAccountUnDeclared)
      eventEmitter.on('credit', sendAccountCredited)
      eventEmitter.on('request_error', sendRequestForbidden)
      eventEmitter.on('debit', sendAccountDebited)
      eventEmitter.on('transfer', sendAccountTransferred)
    }

    function unregisterListeners() {
      eventEmitter.removeListener('declare', sendAccountDeclared)
      eventEmitter.removeListener('undeclare', sendAccountUnDeclared)
      eventEmitter.removeListener('credit', sendAccountCredited)
      eventEmitter.on('request_error', sendRequestForbidden)
      eventEmitter.removeListener('debit', sendAccountDebited)
      eventEmitter.removeListener('transfer', sendAccountTransferred)
    }

    function initialize () {
      const registeredAccounts = accountStore.getRegisteredAccounts()
      for (let account in registeredAccounts) {
        if (registeredAccounts.hasOwnProperty(account)) {
          sendAccountDeclared(registeredAccounts[account].toJson())
        }
      }
    }
  })

  setInterval(() => {
    wss.clients.forEach(ws => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 20000);
}

module.exports = setupWebSocketServer
