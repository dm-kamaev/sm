var express = require('express'),
    router  = express.Router();

var docController = require('./docController');

router.get('/', docController.list);
router.get('/:id', docController.view);


module.exports = router;