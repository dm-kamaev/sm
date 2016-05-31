var express = require('express'),
    router  = express.Router();

var authorizationController = require('./authorizationController');

router.get('/unauthorize', authorizationController.unauthorize);
router.get('/authorize/:type', authorizationController.authorize);
router.get('/oauth/:type', authorizationController.getLink);

module.exports = router;
