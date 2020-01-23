const express = require('express');
const usersRouter = express.Router();
const Users = require('../controllers/Users');
const user = new Users;

//registerations requests
usersRouter.post('/', user.add);

// login requests
usersRouter.post('/:userName', user.find);

// // get all user events
// usersRouter.get('/:userName/events', user.getEvents)

//update user - not supported yet
// router.put('/:userName',user.update);

 module.exports = usersRouter;