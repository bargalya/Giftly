const express = require('express');
const app = express();
const users = require('./routes/Users');
const events = require('./routes/Events');
const gifts = require('./routes/Gifts');

const imgService = require('./routes/ImgService');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/', users);
app.use('/event/', events);
app.use('/imgservice/', imgService);
app.use('/gift/', gifts);

app.get('/', function (req, res) {
    res.send('Giftly Server');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});  
