const express = require('express'),
    router = express.Router();

const courseController = require('./courseController');

router.get('/courseSearch', courseController.search);

module.exports = router;
