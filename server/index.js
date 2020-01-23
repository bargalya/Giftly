const express = require('express');
const app = express();
const users = require('./routes/UsersRouter');
const events = require('./routes/EventsRouter');
const gifts = require('./routes/GiftsRouter');

const imgService = require('./routes/ImgServiceRouter');

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
