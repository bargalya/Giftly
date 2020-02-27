const express = require('express');
const usersRouter = express.Router();
const Users = require('../controllers/Users');
const users = new Users;

//registerations requests
usersRouter.post('/', users.add);

// login requests
usersRouter.post('/:userName', users.find);

// get all events for user
usersRouter.get('/events/:uid', users.getAllEventsForUser)

//update user - not supported yet
usersRouter.put('/:uid',users.update);

 module.exports = usersRouter;