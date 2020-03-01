const express = require('express');
const app = express();
const users = require('./server/src/routes/UsersRouter');
const events = require('./server/src/routes/EventsRouter');
const gifts = require('./server/src/routes/GiftsRouter');
const imgService = require('./server/src/routes/ImgServiceRouter');

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('./server/src/user/', users);
app.use('./server/src/event/', events);
app.use('./server/src/imgservice/', imgService);
app.use('./server/src/gift/', gifts);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function () {
    console.log('Giftly app listening on port ' + port);
});
