const express = require('express');
const router = express.Router();
const Users = require('../src/Users');
const user = new Users;

//registerations requests
router.post('/', user.register);

// login requests
router.post('/:userName', user.login);

//update user
router.put('/:userName',user.update);

 module.exports = router;