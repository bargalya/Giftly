const addManyToDb = require('../dbMgr/dbMgr').addManyToDb;
const giftsCollectionName = "Gifts"; 

class Gifts{
    constructor(){
        Gifts.giftsCollectionName = "Gifts"; 
    }    
}

async function saveGifts(giftsReq, eventId) {
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

    
      const responseDocument = await addManyToDb(giftsCollectionName, giftsDocument);
      console.log("New gifts were added");
      return responseDocument;
}

module.exports = { 
    saveGifts
};