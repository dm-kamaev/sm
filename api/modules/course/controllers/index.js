var express = require('express');
var router = express.Router();

const courseController = require('./courseController'),
    brandController = require('./brandController'),
    departmentController = require('./departmentController'),
    csrf = require('../../../../app/middleware/csrf'),
    checkToken = require('../../../../app/middleware/checkToken');

const DEPARTMENT_ROUTE = '/coursebrand/:brandId/department';

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

router.get(DEPARTMENT_ROUTE, departmentController.list);
router.get(`${DEPARTMENT_ROUTE}/:id`, departmentController.get);
router.post(DEPARTMENT_ROUTE, checkToken, departmentController.create);
router.put(`${DEPARTMENT_ROUTE}/:id`, departmentController.update);

module.exports = router;
