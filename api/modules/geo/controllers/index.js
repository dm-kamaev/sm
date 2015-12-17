var express = require('express'),
    router  = express.Router();

var addressController = require('./addressController');

router.post('/address/list', addressController.list);
//router.get('/school/search', schoolController.search);
//router.get('/school/:id', schoolController.view);
// // router.post('/school', schoolController.create);
//router.post('/school/:id/comment', schoolController.createComment);

module.exports = router;
