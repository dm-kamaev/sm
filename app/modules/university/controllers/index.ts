import * as express from 'express';
import {SubscriptionController} from './subscriptionController';
const csrf = require('../../../middleware/csrf');

const router = express.Router();

const universityController = require('./universityController');

const subscriptionController = new SubscriptionController();

router.get('/university', universityController.information);
router.post('/university/subscribe',
    /*csrf,*/ subscriptionController.actionCreate);

export {router};
