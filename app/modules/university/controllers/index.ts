import * as express from 'express';

const router = express.Router();

const legasyUniversityController = require('./universityController');

import {UniversityController} from './UniversityController';
const universityController: any = new UniversityController();

import {SubscriptionController} from './SubscriptionController';
const subscriptionController = new SubscriptionController();

import {
    ProgramCommentController
} from '../../comment/controllers/ProgramCommentController';
const programCommentController: any = new ProgramCommentController();

router.get('/university', legasyUniversityController.information);

router.get(
    '/vuz/:universityAlias/specialnost/:programAlias',
    universityController.actionGetInformation
);

router.post(
    '/university/subscribe',
    subscriptionController.actionCreate
);
router.post(
    '/program/:programId/comment',
    programCommentController.actionChange
);

export {router};
