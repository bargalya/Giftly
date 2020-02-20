const express = require('express');
const giftsRouter = express.Router();
const Gifts = require('../controllers/Gifts');
const gift = new Gifts();

// get available gifts
giftsRouter.get('/:eventId', gift.getAllGiftsForEvent);
// get gifts bought by user
giftsRouter.get('/:eventId/:userId', gift.getBoughtGifts);
// update gift status
giftsRouter.put('/:giftId',gift.updateGiftStatus);




 module.exports = giftsRouter;