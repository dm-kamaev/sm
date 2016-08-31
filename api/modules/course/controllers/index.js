var express = require('express');
var router = express.Router();

const courseController = require('./courseController');
console.log(courseController.search);
router.get('/course/search', courseController.search);

module.exports = router;
