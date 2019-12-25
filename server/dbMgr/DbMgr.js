const mongo = require('mongodb').MongoClient;

url = "mongodb://localhost:27017/";    
dbName = "giftlyDB";
connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

let db;

// Connect to the DB and initialize the variable with the connection
mongo.connect(url, connectParams, 
    function(err, client) {
        if(err) {                        
            console.log("ERROR! failed to connect to Data base!");
        }
        else {
            db = client.db(dbName);
            console.log("Database created");
        }    
    }
);

function getDb() { 
    return db;
}

function addToDb(collectionName, document, callback)
{
    if (db)
    {        
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
                return callback(err, null, );
            }            
            return callback(null, document);
    });  
}

function addManyToDb(collectionName, document, callback)
{
    if (db)
    {        
        return insertMany(collectionName, document, callback);
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
                return insertMany(collectionName, document, callback);
                }
        );    
    }        
}

function insertMany(collectionName, documents, callback)
{
    const collection = db.collection(collectionName);    
    collection.insertMany(documents,
        function(err){
            if(err) { 
                console.log("failed to add a documents to " + collection + " collection");
                return callback(err);
            }            
            return callback(null, documents);
    });  
}



module.exports = {        
    getDb,
    addToDb,
    addManyToDb    
};