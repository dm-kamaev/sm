var express = require('express');
var router = express.Router();

var courseController = require('./courseController');

router.get(
    '/course/proforientacija/:brandName/:name',
    courseController.information
);
router.get('/', courseController.search);

module.exports = router;
