const mongo = require('mongodb').MongoClient;

url = "mongodb://localhost:27017/";    
dbName = "giftlyDB";
connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

let db;
mongo.connect(url, connectParams, 
    function(err, client) {
        if(err) {                    
            //return callback(err);
            console.log("ERROR! failed to connect to Data base!");
        }
        else {
            db = client.db(dbName);
            console.log("Database created from connect!");
        }
    //    return callback(null, db);
    }
);

// deleting the connect function definition. connecting at the object's initialization
// TODO: delete in the merge to the master branch *********************
/*
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
*/
function getDb() { 
    return db;
}

function addToDb(collectionName, document, callback)
{
    if (db)
    {
        console.log("from func add: DB is already connected");
        return insertOne(collectionName, document, callback);
    }
    else
    {
        // the object is expected to be initialized at the application's rise
        console.log("ERROR!!! from func add: DB is not connected! connecting now. fix bug later!");

        mongo.connect(url, connectParams, 
            function(err, client) {
                if(err) {                    
                    console.log("Error!");
                }
                db = client.db(dbName);
                console.log("Database created!" + db);
                return insertOne(collectionName, document, callback);
                }
        );    
    }        
}

function insertOne(collectionName, document, callback)
{
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
    getDb,
    addToDb    
};