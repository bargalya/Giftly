const express = require('express');
const app = express();
const users = require('./routes/Users');

app.use('/user/', users);
app.get('/', function (req, res) {
    res.send('Giftly Server');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});