const express = require('express');
const app = express();
const users = require('./src/routes/UsersRouter');
const events = require('./src/routes/EventsRouter');
const gifts = require('./src/routes/GiftsRouter');

const imgService = require('./src/routes/ImgServiceRouter');

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
