var express = require('express'),
    router  = express.Router();

var schoolController = require('./schoolController');

router.get('/school', schoolController.list);
router.get('/school/search', schoolController.search);
router.get('/school/search/filters', schoolController.listSearchFilters);
router.get('/school/:id', schoolController.view);
router.get('/school/:id/address', schoolController.getAddresses);
router.get('/school/:school_id/address/:id', schoolController.getAddress);
// router.get('/school/apitest', schoolController.yapi);
// router.get('/school/search', schoolController.search);

// router.get('/school/type', schoolController.listTypes);
// router.post('/school/createschool', schoolController.create);
router.post('/school/:id', schoolController.update);
router.post('/school/:school_id/address/:id', schoolController.updateAddress);
// router.post('/school/:id/comment', schoolController.createComment);

module.exports = router;
