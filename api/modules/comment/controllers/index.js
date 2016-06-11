var express = require('express');
var router = express.Router();

var commentController = require('./commentController');

router.get('/comment/', commentController.list);
router.get('/comment/:id', commentController.view);
router.get('/comment/group/:id', commentController.list);
router.post('/comment/group/:id', commentController.create);
router.delete('/comment/delete/:id', commentController.delete);

module.exports = router;
