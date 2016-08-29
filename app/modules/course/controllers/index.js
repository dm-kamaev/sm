var express = require('express');
var router = express.Router();

var courseController = require('./courseController');

router.get('/courseSearch', courseController.search);

module.exports = router;
