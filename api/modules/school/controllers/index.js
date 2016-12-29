'use strict';

const express = require('express');
const router = express.Router();
const schoolController = require('./schoolController');
const csrf = require('../../../../app/middleware/csrf');
const checkToken = require('../../../../app/middleware/checkToken');

router.get('/school', schoolController.list);
router.get('/school/search', schoolController.search);
router.get('/school/search/map', schoolController.searchMap);
router.get(
    '/school/searchMapPointsLegacy', schoolController.searchMapPointsLegacy
);
router.get('/school/search/suggest', schoolController.suggestSearch);
router.get('/school/search/filters', schoolController.listSearchFilters);
router.get('/school/activitySphere', schoolController.activitySphere);
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


router.post('/school/createschool', checkToken, schoolController.create);
router.post('/school/:id/comment', csrf, schoolController.createComment);

router.put('/school/:id', checkToken, schoolController.update);

router.delete('/school/:id', checkToken, schoolController.delete);

module.exports = router;
