const express = require('express');
const app = express();
const users = require('./routes/Users');
const initDb = require("./src/db").initDb;
const closeDb = require("./src/db").closeDb;
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/', users);
app.get('/', function (req, res) {
    res.send('Giftly Server');
});


initDb(function (err) {
  app.listen(port, function (err) {
      if (err) {
          throw err; //
      }
      console.log("Example app listening on port " + port);
  });
});