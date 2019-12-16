//const mongo = require('mongodb').MongoClient;
//const dbMgr = require('../dbMgr/dbMgr');

//const getDb = require("./db").getDb;
const addToDb = require('../dbMgr/dbMgr').addToDb;


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

    add(req, res){

        const userName = req.body.userName,
        password = req.body.password;

        const document = { 
            UserName: userName,
            Password: password               
        };                 

        // const db = getDb();
        console.log("got a post request body: " + req.body);        
        console.log("got a post request: new user request name " + userName + " password " + password);        
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
                    res.send({
                        'status': 'success',
                        'data': responseDocument
                    });                
                }
            });
        
    //    const mongo = require('mongodb').MongoClient; duplicated - move out
        // Read the user parameters
   /*     const userName = req.body.userName,
        password = req.body.password;

        console.log("got a post request: new user request name " + userName + " password " + password);        

        mongo.connect(Users.url, Users.connectParams, 
            function(err, client) {
                if(err) {
                    res.send({'status': 'Failed',
                            'error': err});
                }
                console.log("Database created!");
                const db = client.db(Users.dbName);
                const collection = db.collection(Users.collectionName);
                const document = { 
                    UserName: userName,
                    Password: password               
                 };                 
                collection.insertOne(document, 
                    function(err){
                        if(err) {
                            res.send({'status': 'Failed',
                                    'error': err});
                        }                        
               */        
// Can't seem to send a response to the front end. Handle this part later
                        // Send a response to the front end
                /*        res.send({"status":"success",
                                "data":{
                                "userName": userName,
                                "password":password}});               */
                /* Galia
                       res.send({
                            'status': 'success',
                            'data': document
                            });
                        })}                         
                
                    });                  
    
             //   client.close();       
        });*/
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
