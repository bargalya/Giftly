const addToDb = require('../dbMgr/dbMgr').addToDb;
const addManyToDb = require('../dbMgr/dbMgr').addManyToDb;
var uuidCreator = require('uuid');

class Events{

    constructor(){
        Events.collectionName = "Events"; 
        Events.giftsCollectionName = "Gifts"; 
    }

    async get(req, res){
    
    }


    update(req, res){

    }

    add(req, res){
        const eventId = uuidCreator.v4();
        let gifts = JSON.parse(req.body.gifts);
        let giftsDocument = [];
        gifts.forEach(gift => { 
            giftsDocument.push(
                {
                    url:gift["Url"],
                    status:gift["Status"],
                    eventId: eventId
                }
            ); 
          });

        let responseGiftsDocument;
        addManyToDb(Events.giftsCollectionName, giftsDocument,
            function(err, responseDocument) {
                if (err)
                {
                    res.send({
                        'status': 'Failed',
                        'error': err});
                }
                else
                {
                    console.log("New gifts were added.");       
                    responseGiftsDocument = responseDocument;
                }
            });  
            
        const document = { 
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            euid: eventId             
        };            
        
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
                        'eventData': responseDocument,
                        'giftsdata': responseGiftsDocument
                    });                
                }
            });  
        }
}

module.exports = Events;
