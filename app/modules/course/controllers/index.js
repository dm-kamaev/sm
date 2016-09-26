var express = require('express');
var router = express.Router();

var courseController = require('./courseController');

router.get('/coursesearch', courseController.search);
router.get('/course', courseController.information);

module.exports = router;
