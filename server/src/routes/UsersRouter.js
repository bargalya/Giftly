const express = require('express');
const usersRouter = express.Router();
const Users = require('../controllers/Users');
const users = new Users;

//registerations requests
usersRouter.post('/', users.add);

// login requests
usersRouter.post('/:userName', users.find);

// get all events for user
usersRouter.get('/:userName/events', users.getAllEventsForUser)

//update user - not supported yet
// router.put('/:userName',user.update);

 module.exports = usersRouter;