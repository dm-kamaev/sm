var express = require('express'),
    router  = express.Router();

var schoolController = require('./schoolController');

router.get('/school', schoolController.list);
router.get('/school/apitest', schoolController.yapi);
router.get('/school/search', schoolController.search);
router.get('/school/search/filters', schoolController.listSearchFilters);
router.get('/school/:id', schoolController.view);
 // router.post('/school', schoolController.create);
router.post('/school/:id/comment', schoolController.createComment);

module.exports = router;
