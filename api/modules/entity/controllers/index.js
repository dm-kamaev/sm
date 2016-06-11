var express = require('express');
var router = express.Router();

var pageController = require('./pageController');

router.post('/:entityType/:entityId/views', pageController.incrementViews);

module.exports = router;
