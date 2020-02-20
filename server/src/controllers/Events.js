const addToDb = require('../dbMgr/dbMgr').addToDb;
const search = require('../dbMgr/dbMgr').search;
// const saveGifts = require('../src/Gifts').saveGifts;
const Gifts = require('./Gifts');
const gifts = new Gifts;

class Events{

    constructor(){
        Events.collectionName = "Events"; 
        Events.userEventsCollectionName = "UserEvents"; 
    }

    async get(req, res){
        let eventId = req.params.eventId
        console.log("got a request to search event " + eventId);
        const ObjectId = require('mongodb').ObjectID;
        const eventIdObj = ObjectId(eventId);
        try {
            let query = {'_id' : eventIdObj};
            const document = await search(query, Events.collectionName);
            if(document != null) {
                console.log("event was found." + document);
                res.status(200).json({
                    'status': 'success',
                    'event': document});
                } else {
                console.log("Failed to find the event in the DB");
                res.status(401).json({
                    'status': 'Failed',
                    'message': 'failed to find event in DB.'
                });
            }
        }
        catch(error) {
            console.log("DB error:" + error);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }
    }


    update(req, res){

    }

    async add(req, res)    
    {
        try {
            const responseEventDocument = await saveEvent(req.body.name, req.body.description, req.body.date); 
            const eventId = responseEventDocument["ops"][0]._id;
            const responseGiftsDocument = await gifts.saveGifts(req.body.gifts, eventId);
            await saveUserEventRel(eventId, req.body.uid, "owner");
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

var saveUserEventRel = async function(eventId, uid, role) { 
    const document = { 
        eventId: eventId,
        uid: uid,
        role: role
    };  

    const responseDocument = await addToDb(Events.userEventsCollectionName, document); 
    console.log("A new relation was added. event: " + eventId + " uid: " + uid);
    return responseDocument;
} 

module.exports = Events;
