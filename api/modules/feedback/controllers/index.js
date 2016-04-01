var express = require('express'),
    router  = express.Router();

var feedbackController = require('./feedbackController');

router.post('/user-feedback', feedbackController.processUserFeedback);

module.exports = router;