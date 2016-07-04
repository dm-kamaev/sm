var express = require('express'),
    router = express.Router();

var schoolController = require('./schoolController');

router.get('/', schoolController.search);
router.get('/school', schoolController.list);
router.get('/school/:name', schoolController.view);
router.get('/school/:listType', schoolController.list);
router.get('/school/:listType/:geoType', schoolController.list);
router.get('/search', schoolController.list);
router.post('/school/:id/comment', schoolController.createComment);

module.exports = router;
