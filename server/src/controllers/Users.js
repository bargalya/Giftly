const addToDb = require('../dbMgr/dbMgr').addToDb;
const search = require('../dbMgr/dbMgr').search;

class Users{    

    constructor(){
        Users.collectionName = "Users"; 
    }

    // Handle registration request
    async add(req, res){

        // Initialize the DB document
        const document = { 
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email           
        };    
        
        // TODO: make userName field unique
        
        try {
            const responseDocument = await addToDb(Users.collectionName, document); 
            console.log("A new user was added. username: " + document.userName);
            res.status(200).send({
                'status': 'success',
                'user': responseDocument["ops"][0]
            });
        }    
        catch(error) {
            console.log("Failed to add a new user to the DB");
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }      
    }
   
    async find(req, res) {        
        console.log("got a request to search user " + req.params.userName);
        try {
            let query = {"userName" : req.params.userName};
            const document = await search(query, Users.collectionName);
            if(document != null) {
                console.log("user was found. password is " + document.password);
                if (document.password == req.body.password) {
                    console.log("password match");                
                    res.status(200).json({
                        'status': 'success',
                        'user': document});
                }
                else {
                    console.log("password doesnt match! expected: " + req.body.password + " recieved " + document.password);                
                    res.status(401).json({
                        'status': 'Failed',
                        'message': 'username or password are incorrect'});                
                }
            }
            else {
                console.log("Failed to find the user in the DB");
                res.status(401).json({
                    'status': 'Failed',
                    'message': 'username or password are incorrect'
                });
            }
        }
        catch(error) {
            console.log("DB error");
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }
    }
    
    async getAllEventsForUser(req, res) {  
        console.log("got a request to get all events for  user " + req.params.userName);
        try {
            //TODO get from Mongo DB
            let events = {"name": "foo"};
            res.status(200).json({events});
            
        } catch(error) {
            console.log("DB error");
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }

    }

    /*
    // not supported yet
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
                        'data': response 
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
//    }
}

module.exports = Users;
