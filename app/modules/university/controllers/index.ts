import * as express from 'express';

const router = express.Router();

import {UniversityRenderController} from './UniversityRenderController';
const universityRenderController: any = new UniversityRenderController();

import {SubscriptionController} from './SubscriptionController';
const subscriptionController = new SubscriptionController();

import {UniversityController} from './UniversityController';
const universityController = new UniversityController();

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

router.get('/university/suggest', universityController.actionSuggestSearch);

router.post(
    '/university/subscribe',
    subscriptionController.actionCreate
);
router.post(
    '/program/:programId/comment',
    programCommentController.actionChange
);

export {router};
