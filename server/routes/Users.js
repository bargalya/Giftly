const express = require('express');
const router = express.Router();
const Users = require('../src/Users');
const user = new Users;

//get user
router.get('/:userid', user.get);
//update user
router.put('/:userid',user.update);
  
 module.exports = router;