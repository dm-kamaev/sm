import * as express from 'express';

const router = express.Router();

import {UniversityRenderController} from './UniversityRenderController';
const universityRenderController: any = new UniversityRenderController();

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
    universityRenderController.actionGetInformation
);

router.get(
    '/program/search',
    universityRenderController.actionGetSearch
);

router.get(
    '/program/filtersearch',
    programController.actionSearch
);

router.get(
    '/program/filtersearch/count',
    programController.actionGetSearchCount
);

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
