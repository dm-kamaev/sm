var express = require('express');
var router = express.Router();

const courseController = require('./courseController'),
    brandController = require('./brandController'),
    departmentController = require('./departmentController'),
    optionController = require('./optionController'),
    categoryController = require('./categoryController'),
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

router.get('/course', courseController.list);
router.get('/course/:id', courseController.get);
router.post('/course', checkToken, courseController.create);
router.put('/course/:id', checkToken, courseController.update);
router.delete('/course/:id', checkToken, courseController.delete);

router.get(DEPARTMENT_ROUTE, departmentController.list);
router.get(`${DEPARTMENT_ROUTE}/:id`, departmentController.get);
router.post(DEPARTMENT_ROUTE, checkToken, departmentController.create);
router.put(`${DEPARTMENT_ROUTE}/:id`, checkToken, departmentController.update);
router.delete(
    `${DEPARTMENT_ROUTE}/:id`,
    checkToken,
    departmentController.delete
);

router.get('/course/:courseId/option', optionController.list);
router.get('/course/:courseId/option/:id', optionController.get);
router.post('/course/:courseId/option', checkToken, optionController.create);
router.put('/course/:courseId/option/:id', checkToken, optionController.update);
router.delete(
    '/course/:courseId/option/:id',
    checkToken,
    optionController.delete
);

router.get('/coursecategory', categoryController.list);
router.get('/coursecategory/:id', categoryController.get);
router.post('/coursecategory', checkToken, categoryController.create);
router.put('/coursecategory/:id', checkToken, categoryController.update);
router.delete('/coursecategory/:id', checkToken, categoryController.delete);

module.exports = router;
