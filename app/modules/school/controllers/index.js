var express = require('express'),
    router  = express.Router();

var schoolController = require('./schoolController');
//var commentController = require('../../comment/controllers/commentController');

router.get('/', schoolController.list);
router.get('/school', schoolController.list);
router.get('/school/:id', schoolController.view);
router.get('/school/:id/comment', schoolController.viewComments);
router.post('/school', schoolController.create);
router.post('/school/:id/comment', schoolController.createComment);

module.exports = router;
