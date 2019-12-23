const addToDb = require('../dbMgr/dbMgr').addToDb;
var uuidCreator = require('uuid');

class Users{    

    constructor(){
        Users.collectionName = "Users"; 
    }

    // Handle registration request
    add(req, res){

        // Initialize the DB document
        const document = { 
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            uuid: uuidCreator.v4()               
        };                 
              
        // Insert the document to the DB
        addToDb(Users.collectionName, document,
            function(err, responseDocument) {
                if (err)
                {
                    res.send({
                        'status': 'Failed',
                        'error': err});
                }
                else
                {

                    console.log("A new user was added. username: " + document.userName);

                    res.send({
                        'status': 'success',
                        'data': responseDocument
                    });                
                }
            });  
    }

    // TODO: should we support GET method?
    // I don't see any reason to support
    get(req, res) {

        //********************* old code - delete */
/*        const mongo = require('mongodb').MongoClient; duplicated move out
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
        });        */
        

        /********************************* new code - uncomment and check it works 
        dbMgr.find(req.params.userid, Users.collectionName,
            function(err, document)
            {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                else {
                res.send({
                    'status': 'success',
                    'data': document}
                )};
            });        
            */
    }
    
    update(req, res){

        dbMgr.update(req.params.userid, Users.collectionName, req.body,
            function(err, response) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                else {
                    res.send({
                        'status': 'success',
                        'data': response // TODO: I am not sure what should I send back
                        });
                }
            });
        /*
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
        });       */        
    }
}

module.exports = Users;
