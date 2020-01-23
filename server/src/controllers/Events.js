const addToDb = require('../dbMgr/dbMgr').addToDb;
// const saveGifts = require('../src/Gifts').saveGifts;
const Gifts = require('./Gifts');
const gifts = new Gifts;

class Events{

    constructor(){
        Events.collectionName = "Events"; 
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
            const responseGiftsDocument = await gifts.saveGifts(req.body.gifts, eventId);
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
