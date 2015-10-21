var express = require('express');
var router = express.Router();

var debugController = require('./controllers/debugController');


router.get('/debug', debugController.view);


module.exports = router;
