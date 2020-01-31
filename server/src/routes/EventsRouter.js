const express = require('express');
const eventsRouter = express.Router();
const Events = require('../controllers/Events');
const events = new Events;

//get event
eventsRouter.get('/:eventId', events.get);
//update event
eventsRouter.put('/:userid',events.update);
//add event
eventsRouter.post('/',events.add);


 module.exports = eventsRouter;