var express = require('express'),
    router  = express.Router();

var addressController = require('./addressController');

router.get('/school/:id/address', addressController.getAddresses);
router.get('/school/:school_id/address/:id', addressController.getAddress);

router.post('/address/list', addressController.list);

module.exports = router;
