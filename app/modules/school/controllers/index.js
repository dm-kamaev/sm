var express = require('express'),
    router  = express.Router();

var schoolController = require('./schoolController');


router.get('/', schoolController.list);
router.get('/school', schoolController.list);
router.get('/school/:id', schoolController.view);
router.post('/school', schoolController.create);


module.exports = router;
