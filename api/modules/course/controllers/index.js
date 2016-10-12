var express = require('express');
var router = express.Router();

const courseController = require('./courseController'),
    brandController = require('./brandController'),
    csrf = require('../../../../app/middleware/csrf');

router.get('/course/search', courseController.search);
router.get('/course/search/map', courseController.searchMap);
router.get('/course/search/suggest', courseController.suggestSearch);

router.get('/course/course-type/popular', courseController.popularCourseType);
router.get('/course/course-type', courseController.searchCourseType);

router.post('/course/enrollment', csrf, courseController.enrollOnCourse);

router.get('/coursebrand', brandController.list);
router.get('/coursebrand/:id', brandController.get);

module.exports = router;
