const express = require('express');
const router = express.Router();
const schoolController = require('./schoolController');

import {SchoolAdminController} from './schoolAdminController';
const schoolAdminController = new SchoolAdminController();

import {CommentAdminController} from './commentAdminController';
const commentAdminController = new CommentAdminController();

import {DepartmentAdminController} from './departmentAdminController';
const departmentAdminController = new DepartmentAdminController();

import {ProfileAdminController} from './profileAdminController';
const profileAdminController = new ProfileAdminController();

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

router.get('/school/:id', schoolController.view);
// router.get('/school/apitest', schoolController.yapi);


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

router.get('/admin/school/:id', schoolAdminController.actionGet);
router.get('/admin/school', schoolAdminController.actionGetAllSchool);
router.post('/admin/school', checkToken, schoolAdminController.actionCreate);
router.put(
    '/admin/school/:schoolId',
    checkToken,
    schoolAdminController.actionUpdate
);
router.delete(
    '/admin/school/:schoolId',
    checkToken,
    schoolAdminController.actionDelete
);

router.get('/admin/schooltype', schoolAdminController.actionGetSchoolTypes);

const initCrudRouting = function(
    route: string,
    controller: any,
    entityId?: string
) {
    entityId = entityId || ':id';
    router.post(route, checkToken, controller.actionCreate);
    router.get(route, controller.actionList);
    router.get(`${route}/${entityId}`, controller.actionGet);
    router.put(`${route}/${entityId}`, checkToken, controller.actionUpdate);
    router.delete(`${route}/${entityId}`, checkToken, controller.actionDelete);
};

initCrudRouting(
    '/admin/school/:schoolId/department',
    departmentAdminController,

);

initCrudRouting(
    '/admin/school/:schoolId/profile',
    profileAdminController,
    ':profileNumber'
);

router.get('/admin/schoolclasses', profileAdminController.actionListClasses);
router.get('/admin/schoolprofiles', profileAdminController.actionListProfiles);

export default router;
