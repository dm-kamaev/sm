var express = require('express');
var router = express.Router();

var courseController = require('./courseController');

router.get('/coursesearch', courseController.search);

module.exports = router;
