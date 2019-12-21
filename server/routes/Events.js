const express = require('express');
const router = express.Router();
const Events = require('../src/Events');
const event = new Events;

//get event
router.get('/:eventid', event.get);
//update event
router.put('/:userid',event.update);
//add event
router.post('/',event.add);


 module.exports = router;