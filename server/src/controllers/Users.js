const addToDb = require('../dbMgr/dbMgr').addToDb;
const search = require('../dbMgr/dbMgr').search;
const findMany = require('../dbMgr/dbMgr').findMany;
const update = require('../dbMgr/dbMgr').update;
var ObjectId = require('mongodb').ObjectId; 

class Users{    

    constructor(){
        Users.collectionName = "Users"; 
        Users.userEventsCollectionName = "UserEvents"; 
        Users.EventsCollectionName = "Events";
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
        let query;
        if(req.body.password === undefined) {                                
            var id = req.params.userName;       
            var o_id = new ObjectId(id);
            query = {"_id" : o_id};
    
            try {    
                const document = await search(query, Users.collectionName);
                if(document != null) {
                    console.log("user was found. password is " + document.password);
                    res.status(200).send({
                        'status': 'success',
                        'user': document
                    });
                }
                else {
                    console.log("Failed to find the user in the DB");
                    res.status(401).json({
                        'status': 'Failed',
                        'message': 'Failed to find the user in the DB'
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
        else
            try {
                query = {"userName" : req.params.userName};

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
        console.log("got a request to get all events for user " + req.params.uid);
        let query = {"uid" : req.params.uid};
        let arr = new Array();
        try {            
            const document = await findMany(query, Users.userEventsCollectionName);
            //pass role and gifts!//InnaToDo!!
            for(const event of document) {
                let queryEvent = {"_id" : event.eventId};
                let eventFromDB = await search(queryEvent, Users.EventsCollectionName);
                arr.push(eventFromDB);
            }
            res.status(200).json({'userEvents': arr});
            
        } catch(error) {
            console.log("DB error");
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }
    }

    async update(req, res) {
        console.log("Here!!!!!! " + req.params.uid);
        try { 
            const userObj = ObjectId(req.params.uid);        
            let query = {'_id' : userObj};
            let newValues = {};
          
            newValues['$set'] = {'firstName': req.body.firstName, 'lastName': req.body.lastName, 'username': req.body.username, 'password': req.body.password, 'email': req.body.email};
            
            try {
                const updateResponse = await update(query, newValues, Users.collectionName);
                return updateResponse;    
            } catch(error) {
                console.log('failed to update user: ' + id);
                res.status(500).json({
                    'status': 'Failed',
                    'message': error.message
                });
            } 

            res.status(200).send({
                'status': 'success'                
            });
        }
        catch(error) {
            console.log("Failed updating the user: " + req.body.name);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        } 
    }
}

module.exports = Users;
