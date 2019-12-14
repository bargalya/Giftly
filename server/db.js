const MongoClient = require('mongodb').MongoClient;
const MONGO_DB_NAME = "giftlyDB";
const MONGO_URL = 'mongodb://localhost:27017/';
const OPTIONS = {
         useNewUrlParser: true,
         useUnifiedTopology: true
};   
module.exports = async function () {
    let client = await MongoClient.connect(MONGO_URL, OPTIONS);
    console.log(client);
    return client.db(MONGO_DB_NAME);
}
