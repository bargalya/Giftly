const mongo = require('mongodb').MongoClient;

url = "mongodb://localhost:27017/";    
dbName = "giftlyDB";
connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

let db;
let usersCollection;
function connectToDb()
{
    // Connect to the DB and initialize the variable with the connection
    mongo.connect(url, connectParams,
    function(err, client) {
        if(err) {                        
            console.log("ERROR! failed to connect to Data base!");
        }
        else {
            db = client.db(dbName);
            console.log("Database created");
            createUniqueIndex();            
        }    
    });
}

function createUniqueIndex()
{
    usersCollection = db.collection("Users");  
    usersCollection.createIndex( { "userName": 1 }, { unique: true } )
}

connectToDb();

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

        await connectToDb();
        return await insertOne(collectionName, document);
    }
}

async function insertOne(collectionName, document) {
    try{
        
        return await usersCollection.insertOne(document);
    }
    catch(err)
    {
        console.log("failed to add a document to " + collection + " collection");
        throw new Error("failed to add a document to " + collection + " collection");
    }
}

async function addManyToDb(collectionName, document)
{
    
    console.log("collectionName!!!!!!" + collectionName);
    if (db)
    {        
        return await insertMany(collectionName, document);
    }
    else
    {
        // the object is expected to be initialized at the application's rise
        console.log("ERROR!!! from func add: DB is not connected! connecting now. fix bug later!");

        mongo.connect(url, connectParams, 
            async function(err, client) {
                if(err) {                    
                    console.log("Error!");
                }
                db = client.db(dbName);
                console.log("Database created!" + db);
                return await insertMany(collectionName, document);
                }
        );    
    }        
}

async function insertMany(collectionName, documents)
{
    try {
        const collection = db.collection(collectionName);    
        return await collection.insertMany(documents);  
    }
    catch(err) {
        console.log("failed to add a documents to " + collection + " collection");
        throw new Error("failed to add a documents to " + collection + " collection");
    }
}

async function findOne(quary, collectionName)
{        
    try {
        let collection = db.collection(collectionName);
        return await collection.findOne(quary);
    }
    catch(err)
    {
        console.log("DbMgr: failed to find a document in " + collectionName + " collection");
        throw new Error("DbMgr: failed to find a document in " + collectionName + " collection");
    }   
}

async function search(query, collectionName)
{  
    return await findOne(query, collectionName);
}
           
module.exports = { 
    addToDb,
    addManyToDb,
    search
};