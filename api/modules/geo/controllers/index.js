var express = require('express'),
    router  = express.Router();

var addressController = require('./addressController');

router.get('/school/:id/address', addressController.getAddresses);
router.get('/school/:school_id/address/:id', addressController.getAddress);

router.put('/school/:school_id/address/:id', addressController.updateAddress);

module.exports = router;
