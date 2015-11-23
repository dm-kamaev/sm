var express = require('express'),
    router  = express.Router();

var schoolController = require('./schoolController');

router.get('/school', schoolController.list);
router.get('/school/search', schoolController.search);
router.get('/school/:id', schoolController.view);
 // router.post('/school', schoolController.create);
router.post('/school/:id/comment', schoolController.createComment);

module.exports = router;
