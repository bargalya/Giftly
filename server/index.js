const express = require('express');
const app = express();
const users = require('./src/routes/UsersRouter');
const events = require('./src/routes/EventsRouter');
const gifts = require('./src/routes/GiftsRouter');

const imgService = require('./src/routes/ImgServiceRouter');

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/', users);
app.use('/event/', events);
app.use('/imgservice/', imgService);
app.use('/gift/', gifts);

app.get('/', function (req, res) {
    res.send('Giftly Server');
});

/*app.listen(port, function () {
    console.log('Giftly app listening on port ' + port);
});
*/

app.listen(process.env.PORT, '0.0.0.0');
