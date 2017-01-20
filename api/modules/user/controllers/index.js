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

var authorizationController = require('./authorizationController');

router.get('/adminuser', checkAction, adminUserController.actionList);
router.get(
    '/adminuser/:adminUserId', adminUserController.actionGet
);
router.post(
    '/adminuser', checkToken, checkAction, adminUserController.actionCreate
);
router.put(
    '/adminuser/:adminUserId',
    checkToken,
    checkAction,
    adminUserController.actionUpdate
);
router.delete(
    '/adminuser/:adminUserId',
    checkToken,
    checkAction,
    adminUserController.actionDelete
);

router.get('/unauthorize', authorizationController.unauthorize);
router.get('/authorize/:type', authorizationController.authorize);
router.get('/oauth/:type', authorizationController.getLink);

module.exports = router;
