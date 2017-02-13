'use strict';

let express = require('express');
let router = express.Router();

const checkToken = require('../../../../app/middleware/checkToken');

const AdminUserController =
    require('./adminUserController').AdminUserController;
const adminUserController = new AdminUserController();
const superUserActionChecker =
    require('../../../../app/middleware/ActionChecker/SuperUserActionChecker');
const checkAction = superUserActionChecker.middleware;
const adminUser = require('../../../../app/middleware/adminUser').adminUser;

var authorizationController = require('./authorizationController');

router.get(
    '/adminuser', adminUser, checkAction, adminUserController.actionList
);
router.get('/adminuser/:adminUserId', adminUserController.actionGet);
router.post(
    '/adminuser',
    checkToken,
    adminUser,
    checkAction,
    adminUserController.actionCreate
);
router.put(
    '/adminuser/:adminUserId',
    checkToken,
    adminUser,
    checkAction,
    adminUserController.actionUpdate
);
router.delete(
    '/adminuser/:adminUserId',
    checkToken,
    adminUser,
    checkAction,
    adminUserController.actionDelete
);

router.get('/unauthorize', authorizationController.unauthorize);
router.get('/authorize/:type', authorizationController.authorize);
router.get('/oauth/:type', authorizationController.getLink);

module.exports = router;
