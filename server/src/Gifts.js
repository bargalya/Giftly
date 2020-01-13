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

    async getAvailableGifts(req, res) {
        const id = ObjectID(req.params.eventId);
        const query = {eventId: id,
                        status : 0};
        try {
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

    async updateGiftStatus(req, res) {
        const giftId = req.params.giftId;
        const status = req.body.status;
        const query = {'giftId' : giftId,
                        '$set' : {'status' : status}};
        if(status === "Taken") {
            query.set('userid', req.body.userId);
        } else {
            query.set('$unset', '{userId: ""}');
        }
        try {
            const updateResponse = await update(query, Gifts.giftsCollectionName);
            res.status(200).send({
                'status': 'success'
            });
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
