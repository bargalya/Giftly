const express = require('express');
const app = express();
const users = require('./routes/Users');
<<<<<<< HEAD
const initDb = require("./src/db").initDb;
const closeDb = require("./src/db").closeDb;
const port = 3000;
=======
const connectToDb = require('./dbMgr/DbMgr').connectToDb;
const events = require('./routes/Events');
>>>>>>> d548807039fb0de257b82174043f5d6c1848d302

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/', users);
app.use('/event/', events);

app.get('/', function (req, res) {
    res.send('Giftly Server');
});


<<<<<<< HEAD
initDb(function (err) {
  app.listen(port, function (err) {
      if (err) {
          throw err; //
      }
      console.log("Example app listening on port " + port);
  });
});
=======
connectToDb(function (err) {
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    }
  )});  
>>>>>>> d548807039fb0de257b82174043f5d6c1848d302
