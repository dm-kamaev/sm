var express = require('express'),
    router  = express.Router();

var debugController = require('./debugController');

router.get('/debug', debugController.view);
router.post('/debugdata', debugController.getData);


module.exports = router;
