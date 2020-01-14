const express = require('express');
const router = express.Router();
const ImgService = require('../src/ImgService');
const imgService = new ImgService;

router.post('/', imgService.getDetails);

module.exports = router;