const express = require('express');
const giftsRouter = express.Router();
const Gifts = require('../controllers/Gifts');
const gift = new Gifts();

// get gifts
giftsRouter.get('/:eventId', gift.getAvailableGifts);
// update gift status
giftsRouter.put('/:giftId',gift.updateGiftStatus);




 module.exports = giftsRouter;