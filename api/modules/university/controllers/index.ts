import * as express from 'express';

const router = express.Router();

const checkToken = require('../../../../app/middleware/checkToken');
const fileHandler = require('../../../../app/middleware/fileHandler');
const fileStorage = fileHandler.any();
import {adminUser} from '../../../../app/middleware/adminUser';
import {
    middleware as superUserCheckAction
} from '../../../../app/middleware/ActionChecker/SuperUserActionChecker';

import {ProfileAdminController} from './ProfileAdminController';
const profileAdminController = new ProfileAdminController();

import {UniversityAdminController} from './UniversityAdminController';
const universityAdminController = new UniversityAdminController();

import {ExamAdminController} from './ExamAdminController';
const examAdminController = new ExamAdminController();

import {EntranceStatisticController} from './EntranceStatisticController';
const entranceStatisticController = new EntranceStatisticController();

const initCrudRouting = function(route: string, controller: any): void {
    router.post(
        route,
        checkToken,
        fileStorage,
        adminUser,
        superUserCheckAction,
        controller.actionCreate
    );
    router.get(route, controller.actionList);
    router.get(`${route}/:id`, controller.actionGet);
    router.put(
        `${route}/:id`,
        checkToken,
        fileStorage,
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

initCrudRouting('/admin/profile', profileAdminController);
initCrudRouting('/admin/university', universityAdminController);
initCrudRouting('/admin/program/:programId/exam', examAdminController);
initCrudRouting(
    '/admin/program/:programId/statistic',
    entranceStatisticController
);

export {router};
