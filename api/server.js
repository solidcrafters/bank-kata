const express = require('express');
const app = express();

app.get('/api/status', (req, res) => res.send({status: 'OK'}));

app.listen(3001, () => console.log('Example app listening on port 3001!'))
