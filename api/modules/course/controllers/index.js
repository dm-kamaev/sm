var express = require('express');
var router = express.Router();

const courseController = require('./courseController');

router.get('/course/search', courseController.search);
router.get('/course/search/map', courseController.searchMap);
router.get('/course/search/suggest', courseController.suggestSearch);

router.get('/course/course-type/popular', courseController.popularCourseType);
router.get('/course/course-type', courseController.searchCourseType);

module.exports = router;
