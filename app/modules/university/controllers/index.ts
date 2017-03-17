import * as express from 'express';

const router = express.Router();

const universityController = require('./universityController');

import {SubscriptionController} from './SubscriptionController';
const subscriptionController = new SubscriptionController();

import {ProgramCommentController} from './ProgramCommentController';
const programCommentController: any = new ProgramCommentController();

router.get('/university', universityController.information);

router.post(
    '/university/subscribe',
    subscriptionController.actionCreate
);
router.post(
    '/program/:programId/comment',
    programCommentController.actionChange
);

export {router};
