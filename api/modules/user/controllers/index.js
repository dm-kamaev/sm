var express = require('express'),
    router  = express.Router();

var authorizationController = require('./authorizationController');

router.get('/authorize/:type', authorizationController.authorize);

module.exports = router;
