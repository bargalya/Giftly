const express = require('express');
const imgServiceRouter = express.Router();
const ImgService = require('../controllers/ImgService');
const imgService = new ImgService;

imgServiceRouter.post('/', imgService.getDetails);

module.exports = imgServiceRouter;