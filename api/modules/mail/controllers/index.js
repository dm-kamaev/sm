var express = require('express');
var router = express.Router();

var deleteController = require('./deleteController');

router.delete('/comment/delete/:id', deleteController.delete);

module.exports = router;
