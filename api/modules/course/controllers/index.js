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
    CoursePageMetaController =
        require('../controllers/coursePageMetaController')
            .CoursePageMetaController,
    csrf = require('../../../../app/middleware/csrf'),
    checkToken = require('../../../../app/middleware/checkToken'),
    fileHandler = require('../../../../app/middleware/fileHandler');

const adminUser = require('../../../../app/middleware/adminUser').adminUser;

const brandIdExtractor = require('./middleware/brandIdExtractor');

const BrandActionChecker =
    require('../../../../app/middleware/ActionChecker/BrandActionChecker');
const checkAction = BrandActionChecker.middleware;

const SuperUserActionChecker =
    require('../../../../app/middleware/ActionChecker/SuperUserActionChecker');
const superUserCheckAction = SuperUserActionChecker.middleware;

router.get('/course/search', courseController.search);
router.get('/course/search/count', courseController.getSearchCount);
router.get('/course/search/map', courseController.searchMap);
router.get('/course/search/suggest', courseController.suggestSearch);

router.get('/course/course-type/popular', courseController.popularCourseType);
router.get('/course/course-type', courseController.searchCourseType);

router.post('/course/enrollment', csrf, courseController.enrollOnCourse);

router.get('/coursefilter', filterController.list);

router.get('/coursebrand/search', checkToken, brandController.search);

router.get('/coursecategory/pricetype', categoryController.getPriceTypes);

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
        checkToken,
        fileStorage,
        idExtractor,
        adminUser,
        checkAction,
        controller.create
    );
    router.get(`${route}`, adminUser, controller.list);
    router.get(`${route}/:id`, controller.get);
    router.put(
        `${route}/:id`,
        checkToken,
        fileStorage,
        idExtractor,
        adminUser,
        checkAction,
        controller.update
    );
    router.delete(
        `${route}/:id`,
        checkToken,
        adminUser,
        checkAction,
        controller.delete
    );
};

initCrudRouting(
    '/coursebrand', brandController, brandIdExtractor.brandExtractor
);
initCrudRouting('/course', courseController, brandIdExtractor.courseExtractor);
initCrudRouting(
    '/coursebrand/:brandId/department',
    departmentController,
    brandIdExtractor.departmentExtractor
);
initCrudRouting(
    '/course/:courseId/option',
    optionController,
    brandIdExtractor.optionExtractor
);

/**
 * @param {string}    route
 * @param {Object}    controller
 */
let initSuperUserCrudRouting = function(route, controller) {
    router.post(
        `${route}`,
        checkToken,
        adminUser,
        superUserCheckAction,
        controller.create || controller.actionCreate
    );
    router.get(
        `${route}`,
        controller.list || controller.actionList
    );
    router.get(
        `${route}/:id`,
        controller.get || controller.actionGet
    );
    router.put(`${route}/:id`,
        checkToken,
        adminUser,
        superUserCheckAction,
        controller.update || controller.actionUpdate
    );
    router.delete(
        `${route}/:id`,
        checkToken,
        adminUser,
        superUserCheckAction,
        controller.delete || controller.actionDelete
    );
};

initSuperUserCrudRouting(
    '/coursesearchcatalog', courseSearchCatalogController
);
initSuperUserCrudRouting('/coursecategory', categoryController);
initSuperUserCrudRouting('/coursetype', typeController);

const coursePageMetaController = new CoursePageMetaController();
initSuperUserCrudRouting(
    '/course/:courseId/pagemeta',
    coursePageMetaController
);

module.exports = router;
