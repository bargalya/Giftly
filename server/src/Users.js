const mongo = require('mongodb').MongoClient;
const getDb = require("./db").getDb;

class Users {
    static collectionName = "Users"; 


    constructor(){
    }

    // TODO: should we support GET method?
    // I don't see any reason to support
    get(req, res) {
        const db = getDb();
        const collection = db.collection(Users.collectionName); 

        const ObjectId = require('mongodb').ObjectID;
        const userid = ObjectId(req.params.userid);
        let query = {'_id' : userid};
        collection.findOne(query, 
            function(err, document){
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                res.send({
                    'status': 'success',
                    'data': document
                    });
        });      
    }

    add(req, res){
        const db = getDb();
        const collection = db.collection(Users.collectionName); 
        const document = { 
            UserName: req.body.userName,
            Password: req.body.password               
         };  
        console.log("created document from request data:", document);

        collection.insertOne(document, 
            function(err){
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }                        
            });                  
            console.log("user was created!");
    }

    update(req, res){
        
        const ObjectId = require('mongodb').ObjectID;
        const userid = ObjectId(req.params.userid);
        let query = {'_id' : userid};
        let newValues = {$set: req.body};
        mongo.connect(Users.url, Users.connectParams, 
            function(err, client) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                let db = client.db(Users.dbName);
                let collection = db.collection(Users.collectionName);
                collection.updateOne(query, newValues,
                    function(err, response){
                        if(err) {
                            res.send({'status': 'Failed',
                                    'error': err});
                        }
                        client.close();
                        res.send({
                            'status': 'success',
                            'data': response
                            });
                });
        });        
    }
}

module.exports = Users;
