const express = require('express');
const router = express.Router();
const Gifts = require('../src/Gifts');
const gift = new Gifts();

// get gifts
router.get('/:eventId', gift.getAvailableGifts);
// update gift status
router.put('/:giftId',gift.updateGiftStatus);




 module.exports = router;