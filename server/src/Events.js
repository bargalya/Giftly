const addToDb = require('../dbMgr/dbMgr').addToDb;
const addManyToDb = require('../dbMgr/dbMgr').addManyToDb;

class Events{

    constructor(){
        Events.collectionName = "Events"; 
        Events.giftsCollectionName = "Gifts"; 
    }

    async get(req, res){
    
    }


    update(req, res){

    }

    add(req, res)    
    {
        let responseEventDocument = saveEvent(req.body.name, req.body.description, req.body.date, res);
        saveGifts(req.body.gifts, responseEventDocument, res);
    }
}


var saveGifts = function(giftsReq, responseEventDocument, res) {
    let gifts = JSON.parse(giftsReq);
    let giftsDocument = [];
    gifts.forEach(gift => { 
        giftsDocument.push(
            {
                url:gift["Url"],
                status:gift["Status"],
                //eventId: responseEventDocument["_id"]
            }
        ); 
      });

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
                res.send({
                    'status': 'success',
                    'eventData': responseEventDocument,
                    'giftsdata': responseDocument
                }); 
            }
        });
}
var saveEvent = function(name, description, date, res) { 
    let responseEventDocument;
    const document = { 
        name: name,
        description: description,
        date: date
    };            
    
    addToDb(Events.collectionName, document,
        function(err, responseDocument) {
            if (err)
            {
                console.log("error adding an event: " + document.name);
                res.send({
                    'status': 'Failed',
                    'error': err});
            }
            else
            {                
                responseEventDocument = responseDocument;  
                console.log("A new event was added. event: " + document.name + " eventId: " + responseEventDocument["_id"]);     
            }
        });
        //console.log("!!!!!A new event was added. event: " + document.name + " eventId: " + responseEventDocument["_id"]); 
        return responseEventDocument;
} 

module.exports = Events;
