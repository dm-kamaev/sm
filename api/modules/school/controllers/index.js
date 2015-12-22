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

router.post('/school/createschool', schoolController.create);
router.post('/school/:id/comment', schoolController.createComment);

router.put('/school/:id', schoolController.update);

router.delete('/school/:id', schoolController.delete);

module.exports = router;
