const express = require('express');
const router = express.Router();
const schoolController = require('./schoolController');

import {SchoolAdminController} from './schoolAdminController';
const schoolAdminController = new SchoolAdminController();

import {CommentAdminController} from './commentAdminController';
const commentAdminController = new CommentAdminController();

import {DepartmentAdminController} from './departmentAdminController';
const departmentAdminController = new DepartmentAdminController();

import {adminUser} from '../../../../app/middleware/adminUser';
import {
    middleware as superUserCheckAction
} from '../../../../app/middleware/ActionChecker/SuperUserActionChecker';


const checkToken = require('../../../../app/middleware/checkToken');
const csrf = require('../../../../app/middleware/csrf.js');

router.get('/school', schoolController.list);
router.get('/school/search', schoolController.search);
router.get('/school/search/map', schoolController.searchMap);
router.get(
    '/school/searchMapPointsLegacy', schoolController.searchMapPointsLegacy
);
router.get('/school/search/suggest', schoolController.suggestSearch);
router.get('/school/search/filters', schoolController.listSearchFilters);
router.get('/school/activitySphere', schoolController.activitySphere);
router.get('/school/types', schoolController.getAllTypes);
router.get(
    '/school/activitySphere/popular', schoolController.popularActivitySphere
);
router.get(
    '/school/specializedClassType', schoolController.specializedClassType
);
router.get(
    '/school/specializedClassType/popular',
    schoolController.popularSpecializedClassType
);

router.get('/school/adminsearch', checkToken, schoolController.adminSearch);

router.get('/school/:id', schoolController.view);

router.post('/school/:id/comment', csrf, schoolController.createComment);

router.get(
    '/school/:schoolId/comment/:commentId',
    commentAdminController.actionGetComment
);
router.get(
    '/school/:schoolId/comment',
    commentAdminController.actionGetAllComments
);
router.put(
    '/school/:schoolId/comment/:commentId',
    checkToken,
    commentAdminController.actionUpdateText
);
router.delete(
    '/school/:schoolId/comment/:commentId',
    checkToken,
    commentAdminController.actionRemoveComment
);

const initCrudRouting = function(route: string, controller: any): void {
    router.post(
        route,
        checkToken,
        adminUser,
        superUserCheckAction,
        controller.actionCreate
    );
    router.get(route, controller.actionList);
    router.get(`${route}/:id`, controller.actionGet);
    router.put(
        `${route}/:id`,
        checkToken,
        adminUser,
        superUserCheckAction,
        controller.actionUpdate
    );
    router.delete(
        `${route}/:id`,
        checkToken,
        adminUser,
        superUserCheckAction,
        controller.actionDelete
    );
};

initCrudRouting(
    '/admin/school',
    schoolAdminController
);

router.get('/admin/schooltype', schoolAdminController.actionGetSchoolTypes);

initCrudRouting(
    '/admin/school/:schoolId/department',
    departmentAdminController
);

export {router};
