var express = require('express');
var router = express.Router();

var addressController = require('./addressController');

router.get('/school/:id/address', addressController.getAddresses);
router.get('/school/:school_id/address/:id', addressController.getAddress);

module.exports = router;
