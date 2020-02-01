const addToDb = require('../dbMgr/dbMgr').addToDb;
const search = require('../dbMgr/dbMgr').search;
const createUniqueIndex = require('../dbMgr/dbMgr').createUniqueIndex;

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
        
        try {
            const responseDocument = await addToDb(Users.collectionName, document); 
            console.log("A new user was added. username: " + document.userName);
            res.status(200).send({
                'status': 'success',
                'data': responseDocument["ops"][0]
            });
        }    
        catch(error) {            
            console.log("Failed to add a new user to the DB. " + error);
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
                        'error': 'username or password are incorrect'}); 
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

    init()
    {   
        createUniqueIndex(Users.collectionName, "userName");                    
    }    
}

module.exports = Users;
