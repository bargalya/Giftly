const addToDb = require('../dbMgr/dbMgr').addToDb;
var uuidCreator = require('uuid');

class Events{

    constructor(){
        Events.collectionName = "Events"; 
    }

    async get(req, res){
    
    }


    update(req, res){

    }

    // Handle event request
    add(req, res){

        // Initialize the DB document
        const document = { 
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            euid: uuidCreator.v4()               
        };            
                
        // Insert the document to the DB
        addToDb(Events.collectionName, document,
            function(err, responseDocument) {
                if (err)
                {
                    res.send({
                        'status': 'Failed',
                        'error': err});
                }
                else
                {

                    console.log("A new event was added. event: " + document.name);

                    res.send({
                        'status': 'success',
                        'data': responseDocument
                    });                
                }
            });  
        }
}

module.exports = Events;
