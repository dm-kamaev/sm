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

const brandIdExtractor = require('./middleware/brandIdExtractor');

const BrandActionChecker =
    require('../../../../app/middleware/ActionChecker/BrandActionChecker');
const checkAction = BrandActionChecker.middleware;

router.get('/course/search', courseController.search);
router.get('/course/search/map', courseController.searchMap);
router.get('/course/search/suggest', courseController.suggestSearch);

router.get('/course/course-type/popular', courseController.popularCourseType);
router.get('/course/course-type', courseController.searchCourseType);

router.post('/course/enrollment', csrf, courseController.enrollOnCourse);

router.get('/coursefilter', filterController.list);

router.get('/coursebrand/search', checkToken, brandController.search);

const fileStorage = fileHandler.any();


/**
 * @param {string}    route
 * @param {Object}    controller
 * @param {Function=} opt_idExtractor
 */
let initCrudRouting = function(route, controller, opt_idExtractor) {
    const idExtractor = opt_idExtractor || function(request, response, next) {
        next();
    };
    router.post(
        `${route}`,
        idExtractor,
        checkToken,
        fileStorage,
        checkAction,
        controller.create
    );
    router.get(`${route}`, controller.list);
    router.get(`${route}/:id`, controller.get);
    router.put(
        `${route}/:id`,
        idExtractor,
        checkToken,
        fileStorage,
        checkAction,
        controller.update
    );
    router.delete(
        `${route}/:id`,
        checkToken,
        checkAction,
        controller.delete
    );
};

initCrudRouting(
    '/coursebrand', brandController, brandIdExtractor.brandExtractor
);
initCrudRouting('/course/search-catalog', courseSearchCatalogController);
initCrudRouting('/course', courseController);
initCrudRouting(
    '/coursebrand/:brandId/department',
    departmentController,
    brandIdExtractor.departmentExtractor
);
initCrudRouting('/course/:courseId/option', optionController);
initCrudRouting('/coursecategory', categoryController);
initCrudRouting('/coursetype', typeController);

module.exports = router;
