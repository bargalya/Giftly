const MongoClient = require('mongodb').MongoClient;
const MONGO_DB_NAME = "giftlyDB";
const MONGO_URL = 'mongodb://localhost:27017';
const OPTIONS = {
         useNewUrlParser: true,
         useUnifiedTopology: true
};   
module.exports = function () {
    return MongoClient.connect(MONGO_URL, OPTIONS);
}
