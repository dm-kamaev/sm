var express = require('express');
var router = express.Router();

var commentController = require('./commentController');

router.get('/comment/', commentController.list);
router.get('/comment/:id', commentController.view);
router.get('/comment/group/:id', commentController.list);
router.post('/comment/group/:id', commentController.create);


const UniversityController =
    require('../controllers/UniversityCommentController')
        .UniversityCommentController;
const universityController = new UniversityController();
router.post(
    '/university/program/:programId/comment', universityController.actionCreate
);

module.exports = router;
