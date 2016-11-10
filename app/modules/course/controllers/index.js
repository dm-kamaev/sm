var express = require('express');
var router = express.Router();

var courseController = require('./courseController');

router.get(
    '/:categoryName/:brandName/:name',
    courseController.information
);

router.get('/:categoryName', courseController.search);
router.get('/', courseController.home);

module.exports = router;
