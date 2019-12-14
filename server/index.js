const express = require('express');
const app = express();
const users = require('./routes/Users');
const events = require('./routes/Events');
const connectToDb = require('./dbMgr/DbMgr').connectToDb;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/', users);
app.use('/event/', events);

app.get('/', function (req, res) {
    res.send('Giftly Server');
});


connectToDb(function (err) {
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    }
  )});  
