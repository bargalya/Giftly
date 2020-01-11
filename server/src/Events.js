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

    async add(req, res)    
    {
        try {
            const responseEventDocument = await saveEvent(req.body.name, req.body.description, req.body.date);
            const eventId = responseEventDocument["ops"][0]._id;
            const responseGiftsDocument = await saveGifts(req.body.gifts, eventId);
            res.status(200).send({
                'status': 'success',
                'eventData': responseEventDocument["ops"][0],
                'giftsdata': responseGiftsDocument["ops"]
            });
        }
        catch(error) {
            console.log("Failed adding an event: " + req.body.name);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }        
    }
}


var saveGifts = async function(giftsReq, eventId) {
    let gifts = JSON.parse(giftsReq);
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

    
      const responseDocument = await addManyToDb(Events.giftsCollectionName, giftsDocument);
      console.log("New gifts were added");
      return responseDocument;
}

var saveEvent = async function(name, description, date) { 
    const document = { 
        name: name,
        description: description,
        date: date
    };  

    const responseDocument = await addToDb(Events.collectionName, document); 
    console.log("A new event was added. event: " + document.name + " eventId: " + responseDocument["ops"][0]["_id"]);
    return responseDocument;
} 

module.exports = Events;
