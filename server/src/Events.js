const addToDb = require('../dbMgr/dbMgr').addToDb;
const addManyToDb = require('../dbMgr/dbMgr').addManyToDb;

const asyncInsertOne = require('../dbMgr/dbMgr').asyncInsertOne;
const asyncInsertMany = require('../dbMgr/dbMgr').asyncInsertMany;

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
            const document = generateEventDoc(req.body.name, req.body.description, req.body.date);  
            const eventId =  await saveEvent(document);
            const giftsDocument = generateGiftsDoc(req.body.gifts, eventId);
            const giftsIds =  await saveGifts(giftsDocument);
            res.status(201).send({
                'status': 'success',
                'eventData': eventId,
                'giftsdata': giftsIds
            }); 
        } catch(error) {
            res.status(502).json({
                'status': 'Failed',
                'message': error.message
            });
        }
    }
}

async function saveEvent(eventDoc) { 
    let responseDocument = await asyncInsertOne(Events.collectionName, eventDoc); 
    console.log("saveEvent: A new event was added. event: ", responseDocument.insertedId);
    return responseDocument.insertedId;
} 

async function saveGifts(giftsDocument) {
    let responseDocument = await asyncInsertMany(Events.giftsCollectionName, giftsDocument);
    console.log("New gifts were added.", responseDocument.insertedIds);       
    return responseDocument.insertedIds;    
}

function generateEventDoc(name, description, date) {
    return {
        name: name,
        description: description,
        date: date
    };
}

function generateGiftsDoc(giftsReq, eventId) {
    let gifts = JSON.parse(giftsReq);
    let giftsDocument = [];
    gifts.forEach(gift => {
        giftsDocument.push({
            url: gift["Url"],
            status: gift["Status"],
            eventId: eventId
        });
    });
    return giftsDocument;
}

/* var saveGifts = function(giftsReq, responseEventDocument, res) {
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
} */

module.exports = Events;


