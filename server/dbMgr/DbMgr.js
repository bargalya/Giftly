const mongo = require('mongodb').MongoClient;

url = "mongodb://localhost:27017/";    
dbName = "giftlyDB";
connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

let db;

function connectToDb(callback)
{
    if (db)
    {
        console.warn("DB is already connected");
        return callback(null, _db);
    }
    else
    {
        console.log("trying to connect to DB");

        mongo.connect(url, connectParams, 
            function(err, client) {
                if(err) {                    
                    return callback(err);
                }
                db = client.db(dbName);
                console.log("Database created!");
                return callback(null, db);
            }
        );          
    }
}

function getDb() { 
    return db;
}

function addToDb(collectionName, document, callback)
{
    /////////////////////////////////////////////////////////////////
    // DEBUG
    if (db)
        console.log("from func add: DB is already connected");
    else
        console.log("from func add: DB is not connected!");
        
    /////////////////////////////////////////////////////////////////

    const collection = db.collection(collectionName);
    
    collection.insertOne(document,
        function(err){
            if(err) { 
                console.log("failed to add a document to " + collection + " collection");
                return callback(err);                    
//                                    res.send({'status': 'Failed',
//                                         'error': err});
            }
            return callback(null, document);
    });   
}

module.exports = {    
    connectToDb,    
    getDb
    //addToDb    
};