const ObjectId = require('mongodb').ObjectID;
const addToDb = require('../dbMgr/dbMgr').addToDb;
const search = require('../dbMgr/dbMgr').search;
const update = require('../dbMgr/DbMgr').update;
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
        try {
            const eventIdObj = ObjectId(eventId);
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


    async update(req, res){
        try {            
            await updateEvent(req.params.eventId, req.body.name, req.body.description, req.body.date);
            
            res.status(200).send({
                'status': 'success'                
            });
        }
        catch(error) {
            console.log("Failed updating an event: " + req.body.name, " ", error.message);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        } 
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

var updateEvent = async function(id, name, description, date){
    const eventIdObj = ObjectId(id);        
    let query = {'_id' : eventIdObj};
    let newValues = {};
  
    newValues['$set'] = {'name': name, 'description': description, 'date': date};
    
    try {
        const updateResponse = await update(query, newValues, Events.collectionName);
        return updateResponse;    
    } catch(error) {
        console.log('failed to update Event ' + eventId);
        res.status(500).json({
            'status': 'Failed',
            'message': error.message
        });
    }

}

module.exports = Events;
