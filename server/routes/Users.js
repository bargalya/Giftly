const express = require('express');
const router = express.Router();
const Users = require('../src/Users');
const user = new Users;

//get user
router.get('/:userid', user.get);
//update user
router.put('/:userid',user.update);
//add user
router.post('/',user.add);


 module.exports = router;