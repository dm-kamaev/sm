var express = require('express');
var router = express.Router();

const courseController = require('./courseController'),
    brandController = require('./brandController'),
    csrf = require('../../../../app/middleware/csrf'),
    checkToken = require('../../../../app/middleware/checkToken');

router.get('/course/search', courseController.search);
router.get('/course/search/map', courseController.searchMap);
router.get('/course/search/suggest', courseController.suggestSearch);

router.get('/course/course-type/popular', courseController.popularCourseType);
router.get('/course/course-type', courseController.searchCourseType);

router.post('/course/enrollment', csrf, courseController.enrollOnCourse);

router.get('/coursebrand', brandController.list);
router.get('/coursebrand/:id', brandController.get);
router.post('/coursebrand', checkToken, brandController.create);
router.put('/coursebrand/:id', checkToken, brandController.update);
router.delete('/coursebrand/:id', checkToken, brandController.delete);

module.exports = router;
