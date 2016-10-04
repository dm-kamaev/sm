var express = require('express');
var router = express.Router();

var courseController = require('./courseController');

router.get(
    '/proforientacija/:brandName/:name',
    courseController.information
);

router.get('/proforientacija', courseController.search);

module.exports = router;
