'use strict';

let express = require('express');
let router = express.Router();

const checkToken = require('../../../../app/middleware/checkToken');

const AdminUserController =
    require('./adminUserController').AdminUserController;
const adminUserController = new AdminUserController();

var authorizationController = require('./authorizationController');

router.get('/adminuser', adminUserController.actionList);
router.get('/adminuser/:adminUserId', adminUserController.actionGet);
router.post('/adminuser', checkToken, adminUserController.actionCreate);
router.put(
    '/adminuser/:adminUserId', checkToken, adminUserController.actionUpdate
);
router.delete(
    '/adminuser/:adminUserId', checkToken, adminUserController.actionDelete
);

router.get('/unauthorize', authorizationController.unauthorize);
router.get('/authorize/:type', authorizationController.authorize);
router.get('/oauth/:type', authorizationController.getLink);

module.exports = router;
