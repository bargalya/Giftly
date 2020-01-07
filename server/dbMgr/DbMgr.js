const mongo = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;

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

async function addToDb(collectionName, document)
{
    if (db)
    {       
        return await insertOne(collectionName, document);
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
                return insertOne(collectionName, document);
                }
        );    
    }        
}

async function insertOne(collectionName, document) {
    try{
        const collection = db.collection(collectionName);  
        return await collection.insertOne(document);
    }
    catch(err)
    {
        console.log("failed to add a document to " + collection + " collection");
        throw new Error("failed to add a document to " + collection + " collection");
    }
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

async function findOne(quary, collectionName, callback)
{        
    try{
        // get the desired collection we want to search in
        let collection = db.collection(collectionName);
        return await collection.findOne(quary);
    }
    catch(err)
    {
        console.log("DbMgr: failed to find a document in " + collectionName + " collection");
        throw new Error("DbMgr: failed to find a document in " + collectionName + " collection");
    }   
}

function findUserName(userName, collectionName, callback)
{
    let query = {"userName" : userName};    
    return findOne(query, collectionName, callback);
}
           
module.exports = { 
    addToDb,
    findUserName,
    addManyToDb
};