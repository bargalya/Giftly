const express = require('express');
const router = express.Router();
const Users = require('../src/Users');
const user = new Users;

//registerations requests
router.post('/', user.add);

// login requests
router.post('/:userName', user.find);

//update user - not supported yet
// router.put('/:userName',user.update);

 module.exports = router;