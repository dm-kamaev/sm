import * as express from 'express';
const router = express.Router();

const checkToken = require('../../../../app/middleware/checkToken');
const fileHandler = require('../../../../app/middleware/fileHandler');
const fileStorage = fileHandler.any();
import {adminUser} from '../../../../app/middleware/adminUser';
import {
    middleware as superUserCheckAction
} from '../../../../app/middleware/ActionChecker/SuperUserActionChecker';

const addressController = require('./addressController');
import {CityAdminController} from './CityAdminController';
import {CityController} from './CityController';
const cityController = new CityController();


router.get('/school/:id/address', addressController.getAddresses);
router.get('/school/:school_id/address/:id', addressController.getAddress);

router.get('/program/cities', cityController.actionProgramList);

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
    if (controller.actionDelete) {
        router.delete(
            `${route}/:id`,
            checkToken,
            adminUser,
            superUserCheckAction,
            controller.actionDelete
        );
    }
};
initCrudRouting('/admin/city', new CityAdminController());

export {router};
