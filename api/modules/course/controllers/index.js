var express = require('express');
var router = express.Router();

const courseController = require('./courseController');
router.get('/course/search', courseController.search);
router.get('/course/search/map', courseController.searchMap);

module.exports = router;
