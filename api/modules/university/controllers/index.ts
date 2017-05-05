import * as express from 'express';

const router = express.Router();

const checkToken = require('../../../../app/middleware/checkToken');
import {
    middleware as checkApiToken
} from '../../../../app/middleware/checkApiToken';
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
const programAdminController: any = new ProgramAdminController();

import {ExamAdminController} from './ExamAdminController';
const examAdminController = new ExamAdminController();

import {ExamController} from './ExamController';
const examController: any = new ExamController();

import {EntranceStatisticController} from './EntranceStatisticController';
const entranceStatisticController: any = new EntranceStatisticController();

import {
    EntranceStatisticAdminController
} from './EntranceStatisticAdminController';
const entranceStatisticAdminController = new EntranceStatisticAdminController();

import {ProgramController} from './ProgramController';
const programController: any = new ProgramController();

import {ProgramPageController} from './ProgramPageController';
const programPageController: any = new ProgramPageController();

import {UniversityPageController} from './UniversityPageController';
const universityPageController: any = new UniversityPageController();

import {UniversityController} from './UniversityController';
const universityController: any = new UniversityController();

import {
    AdminProgramCommentController
} from '../../comment/controllers/AdminProgramCommentController';
const adminProgramCommentController = new AdminProgramCommentController();

import {
    ProgramCommentController
} from '../../comment/controllers/ProgramCommentController';
const programCommentController = new ProgramCommentController();

import {ProgramMajorController} from './ProgramMajorController';
const programMajorController: any = new ProgramMajorController();

import {ProgramMajorAdminController} from './ProgramMajorAdminController';
const programMajorAdminController = new ProgramMajorAdminController();
import {ProgramMetaAdminController} from './ProgramMetaAdminController';

import {ProgramMetaController} from './ProgramMetaController';
const programMetaController: any = new ProgramMetaController();

import {ProgramSimilarController} from './ProgramSimilarController';
const programSimilarController: any = new ProgramSimilarController();

router.get('/university/:id', universityController.actionGet);

router.get(
    '/university/alias/:alias',
    universityPageController.actionFindByAlias
);

router.get('/program/search', programController.actionSearch);
router.get('/program/search/count', programController.actionCountSearch);

router.get(
    '/program/:id',
    programController.actionProgramPage
);

router.get(
    '/program/alias/:alias',
    programPageController.actionGet
);

router.get(
    '/program/:id/statistic/last',
    entranceStatisticController.actionGet
);
router.get('/program/:id/exam', examController.actionList);

router.get('/program/search/suggest', programController.actionSuggestSearch);

router.get('/programmajor/search', programMajorController.actionSearch);
router.get('/programmajor/popular', programMajorController.actionGetPopular);

router.get('/program/:programId/pagemeta', programMetaController.actionGet);

router.get('/program/:programId/similar', programSimilarController.actionGet);

router.get('/programmajor/search', programMajorController.actionSearch);
router.get(
    '/programmajor/:programMajorId/advicedcourses',
    programMajorController.actionGetAdvicedCourses
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
initCrudRouting(
    '/admin/program/:programId/comment',
    adminProgramCommentController
);

initCrudRouting('/admin/programmajor', programMajorAdminController);

const initSimpleCrudRouting = function(route: string, controller: any): void {
    router.post(
        route,
        checkApiToken,
        controller.actionCreate
    );
    router.get(route, controller.actionList);
    router.get(`${route}/:id`, controller.actionGet);
    router.put(
        `${route}/:id`,
        checkApiToken,
        controller.actionUpdate
    );
    if (controller.actionDelete) {
        router.delete(route, checkApiToken, controller.actionDelete);
    }
};

initSimpleCrudRouting(
    '/program/:programId/comment',
    programCommentController
);

const programMetaAdminController: any = new ProgramMetaAdminController();
router.get(
    '/admin/program/:programId/pagemeta/:id',
    programMetaAdminController.actionGet
);
router.post(
    '/admin/program/:programId/pagemeta',
    checkToken,
    adminUser,
    superUserCheckAction,
    programMetaAdminController.actionCreate
);
router.put(
    '/admin/program/:programId/pagemeta/:id',
    checkToken,
    adminUser,
    superUserCheckAction,
    programMetaAdminController.actionUpdate
);

router.get(
    '/admin/program/:programId/alias',
    programAdminController.actionGetAlias
);
export {router};
