const express = require('express');
const app = express();
const users = require('./src/routes/UsersRouter');
const events = require('./src/routes/EventsRouter');
const gifts = require('./src/routes/GiftsRouter');
const usersClass = require('./src/controllers/Users');
const imgService = require('./src/routes/ImgServiceRouter');

const connectToDb = require('./src/dbMgr/dbMgr').connectToDb;
const user = new usersClass;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/', users);
app.use('/event/', events);
app.use('/imgservice/', imgService);
app.use('/gift/', gifts);

app.get('/', function (req, res) {
    res.send('Giftly Server');
});

initDbConnection();

app.listen(3000, function () {
    console.log('Giftly server listening on port 3000!');
});


function initDbConnection()
{
    console.log("before init DB connection");
    err = connectToDb(
        function(err) {            
            if(!err) {
                user.init();
            }            
        });
}



