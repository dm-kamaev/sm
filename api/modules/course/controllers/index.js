'use strict';

const express = require('express');
const router = express.Router();

const courseController = require('./courseController'),
    brandController = require('./brandController'),
    departmentController = require('./departmentController'),
    optionController = require('./optionController'),
    categoryController = require('./categoryController'),
    typeController = require('./typeController'),
    filterController = require('./filterController'),
    courseSearchCatalogController = require('./courseSearchCatalogController'),
    csrf = require('../../../../app/middleware/csrf'),
    checkToken = require('../../../../app/middleware/checkToken'),
    fileHandler = require('../../../../app/middleware/fileHandler');

router.get('/course/search', courseController.search);
router.get('/course/search/map', courseController.searchMap);
router.get('/course/search/suggest', courseController.suggestSearch);

router.get('/course/course-type/popular', courseController.popularCourseType);
router.get('/course/course-type', courseController.searchCourseType);

router.post('/course/enrollment', csrf, courseController.enrollOnCourse);

router.get('/coursefilter', filterController.list);

const fileStorage = fileHandler.any();

/**
 * @param {string}  route
 * @param {Object}  controller
 * @param {Object=} opt_middleware
 */
let initCrudRouting = function(route, controller) {
    router.post(`${route}`, checkToken, fileStorage, controller.create);
    router.get(`${route}`, controller.list);
    router.get(`${route}/:id`, controller.get);
    router.put(`${route}/:id`, checkToken, fileStorage, controller.update);
    router.delete(`${route}/:id`, checkToken, controller.delete);
};

initCrudRouting('/coursebrand', brandController);
initCrudRouting('/course/search-catalog', courseSearchCatalogController);
initCrudRouting('/course', courseController);
initCrudRouting('/coursebrand/:brandId/department', departmentController);
initCrudRouting('/course/:courseId/option', optionController);
initCrudRouting('/coursecategory', categoryController);
initCrudRouting('/coursetype', typeController);

module.exports = router;
