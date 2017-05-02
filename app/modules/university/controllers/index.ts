import * as express from 'express';

const router = express.Router();

import {ProgramRenderController} from './ProgramRenderController';
const programRenderController: any = new ProgramRenderController();

import {SubscriptionController} from './SubscriptionController';
const subscriptionController = new SubscriptionController();

import {UniversityController} from './UniversityController';
const universityController = new UniversityController();

import {ProgramController} from './ProgramController';
const programController = new ProgramController();

import {ProgramMajorController} from './ProgramMajorController';
const programMajorController = new ProgramMajorController();

import {
    ProgramCommentController
} from '../../comment/controllers/ProgramCommentController';
const programCommentController: any = new ProgramCommentController();

router.get(
    '/vuz/:universityAlias/specialnost/:programAlias',
    programRenderController.actionGetInformation
);

router.get('/program/search', programRenderController.actionGetSearch);

router.get('/program/filtersearch', programController.actionSearch);

router.get('/university/suggest', universityController.actionSuggestSearch);

router.post(
    '/program/subscribe',
    subscriptionController.actionCreate
);
router.post(
    '/program/:programId/comment',
    programCommentController.actionChange
);

router.get('/programmajor/search', programMajorController.actionSearch);
router.get('/programmajor/popular', programMajorController.actionGetPopular);

export {router};
