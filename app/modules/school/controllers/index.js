var express = require('express'),
    router = express.Router();

var schoolController = require('./schoolController');

router.get('/', schoolController.home);
router.get('/school', schoolController.list);
router.get('/school/:name', schoolController.view);
router.get('/school/:listType', schoolController.list);
router.get('/school/:listType/:geoType', schoolController.list);
router.post('/school/:id/comment', schoolController.createComment);
router.get('/search', schoolController.search);

module.exports = router;
