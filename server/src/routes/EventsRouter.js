const express = require('express');
const eventsRouter = express.Router();
const Events = require('../controllers/Events');
const event = new Events;

//get event
eventsRouter.get('/:eventid', event.get);
//update event
eventsRouter.put('/:userid',event.update);
//add event
eventsRouter.post('/',event.add);


 module.exports = eventsRouter;