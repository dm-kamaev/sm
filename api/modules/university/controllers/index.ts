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

import {ProgramAdminController} from './ProgramAdminController';
const programAdminController = new ProgramAdminController();

import {ExamAdminController} from './ExamAdminController';
const examAdminController = new ExamAdminController();

import {EntranceStatisticController} from './EntranceStatisticController';
const entranceStatisticController: any = new EntranceStatisticController();

import {
    EntranceStatisticAdminController
} from './EntranceStatisticAdminController';
const entranceStatisticAdminController = new EntranceStatisticAdminController();

import {ProgramController} from './ProgramController';
const programController: any = new ProgramController();

import {UniversityPageController} from './UniversityPageController';
const universityPageController: any = new UniversityPageController();

router.get(
    '/program/:id',
    programController.actionProgramPage
);

router.get('/university/:alias', universityPageController.actionFindByAlias);

router.get(
    '/program/:id/statistic/last',
    entranceStatisticController.actionGet
);

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
initCrudRouting(
    '/admin/university/:universityId/program',
    programAdminController
);
initCrudRouting('/admin/program/:programId/exam', examAdminController);
initCrudRouting(
    '/admin/program/:programId/statistic',
    entranceStatisticAdminController
);

export {router};
