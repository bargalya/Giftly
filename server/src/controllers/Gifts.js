const addManyToDb = require('../dbMgr/dbMgr').addManyToDb;
const findMany = require('../dbMgr/DbMgr').findMany;
const update = require('../dbMgr/DbMgr').update;
const ObjectID = require('mongodb').ObjectID;

class Gifts{
    constructor(){
        Gifts.giftsCollectionName = "Gifts"; 
    }    

    async saveGifts(giftsReq, eventId) {
        let gifts = JSON.parse(giftsReq);
        let giftsDocument = [];
        gifts.forEach(gift => { 
            giftsDocument.push(
                {
                    url:gift["Url"],
                    status:gift["Status"],
                    imgTitle:gift["Title"],
                    imgUrl:gift["ImgUrl"],
                    eventId: eventId
                }
            ); 
        });
        const responseDocument = await addManyToDb(Gifts.giftsCollectionName, giftsDocument);
        console.log("New gifts were added");
        return responseDocument;
    }

    async getAllGiftsForEvent(req, res) {
        try {
            const id = ObjectID(req.params.eventId);
            const query = {eventId: id};
            let gifts = await findMany(query, Gifts.giftsCollectionName);
            res.status(200).send({
                'status': 'success',
                'gifts': gifts
            });
        } catch(error) {
            console.log("Failed finding available gifts of event: " + id);
            console.log(error);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }        
    }

    async getBoughtGifts(req, res) {
        try {
            const eventId = ObjectID(req.params.eventId);
            const userId = ObjectID(req.params.userId);
            const query = {"eventId": eventId,
                            "userId": userId,
                            "status": 1};
            let gifts = await findMany(query, Gifts.giftsCollectionName);
            res.status(200).send({
                'status': 'success',
                'gifts': gifts
            });
        } catch(error) {
            console.log("Failed finding gifts of event: " + eventId + " that were bought by user " + userId);
            console.log(error);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }        
    }

    async updateGiftStatus(req, res) {
        const status = req.body.status;
        var query = {};
        var newValues = {};
        if(status === 1) {
            query['status'] = 0;
            newValues['$set'] = {'userId': ObjectID(req.body.userId), 
                                'status': 1};
        } else {
            query['status'] = 1;
            newValues['$set'] = {'status' : 0};
            newValues['$unset'] = {'userId': ""};
        }
        try {
            const giftId = ObjectID(req.params.giftId);
            query = {'_id' : giftId};
            const updateResponse = await update(query, newValues, Gifts.giftsCollectionName);
            if(updateResponse.result.nModified == 0) {
                console.log("no update");
                if(status === 1) {
                    res.status(403).send({
                        'status': 'Failed',
                        'error': 'Gift ' + giftId + ' alredy taken, or no such gift exists'
                    });
                } else {
                    res.status(500).json({
                        'status': 'Failed',
                    });
                }
            } else {
                res.status(200).send({
                    'status': 'success'
                });
            }
        } catch(error) {
            console.log("Failed updating the status of gift: " + giftId);
            res.status(500).json({
                'status': 'Failed',
                'message': error.message
            });
        }      
    }
}

module.exports = Gifts;
