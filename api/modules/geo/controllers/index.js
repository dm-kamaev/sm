var express = require('express'),
    router  = express.Router();

var addressController = require('./addressController');

router.get('/school/:id/address', addressController.getAddresses);
router.get('/school/:school_id/address/:id', addressController.getAddress);
router.get(
    '/school/:school_id/address/:address_id/department/:id',
    addressController.getDepartment
);
router.get(
    '/school/:school_id/address/:address_id/department',
    addressController.getDepartments
);

router.post('/school/:school_id/address/', addressController.addAddress);
router.post(
    '/school/:school_id/address/:id/department',
    addressController.addDepartment
);

router.put('/school/:school_id/address/:id', addressController.updateAddress);
router.put(
    '/school/:school_id/address/:address_id/department/:id',
    addressController.updateDepartment
);

module.exports = router;
