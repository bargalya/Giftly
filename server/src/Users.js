class Users{
    static url = "mongodb://localhost:27017/";
    static dbName = "giftlyDB";
    static collectionName = "Users"; 
    static connectParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };   

    constructor(){
    }

    get(req, res) {
        const mongo = require('mongodb').MongoClient;
        const ObjectId = require('mongodb').ObjectID;
        const userid = ObjectId(req.params.userid);
        let query = {'_id' : userid};
        mongo.connect(Users.url, Users.connectParams, 
            function(err, client) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                let db = client.db(Users.dbName);
                let collection = db.collection(Users.collectionName);
                collection.findOne(query, 
                    function(err, document){
                        if(err) {
                            res.send({'status': 'Failed',
                                    'error': err});
                        }
                        client.close();
                        res.send({
                            'status': 'success',
                            'data': document
                            });
                });
        });        
    }

    add(req, res){
        const mongo = require('mongodb').MongoClient;
        const firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email;
        let document = { 
            "firstName": firstName,
            "lastName": lastName,
            'email': email
         };
        mongo.connect(Users.url, Users.connectParams, 
            function(err, client) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                let db = client.db(Users.dbName);
                let collection = db.collection(Users.collectionName);
                collection.insertOne(document, 
                    function(err){
                        if(err) {
                            res.send({'status': 'Failed',
                                    'error': err});
                        }
                        client.close();
                        res.send({
                            'status': 'success',
                            'data': document
                            });
                });
        });        
    }

    update(req, res){
        const mongo = require('mongodb').MongoClient;
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
