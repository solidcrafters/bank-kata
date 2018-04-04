const WebSocket = require('ws');

const {ACCOUNT_DECLARED} = require('./commons/constants');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  [
    {name: 'Account One'},
    {name: 'Account Two'},
    {name: 'Account Three'},
    {name: 'Account Four'},
    {name: 'Account Five'},
    {name: 'Account Six'},
    {name: 'Account Seven'},
  ].forEach(({name}, index) => {
    setTimeout(() => {
      ws.send(JSON.stringify({
        type: ACCOUNT_DECLARED,
        payload: {
          name,
          balance: Math.trunc(Math.random() * 2000 - 1000)
        }
      }));
    }, index * 1000 + 500)
  });
});
