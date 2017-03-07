import {LegacyController} from '../../../../api/components/interface';
import {service} from '../services/subscriptionService';

const Controller: LegacyController = require('nodules/controller').Controller;

import {EmailAlreadyExist as EmailAlreadyExistError}
    from './errors/EmailAlreadyExist';

import {InvalidEmail as InvalidEmailError}
    from './errors/InvalidEmail';

class SubscriptionController extends Controller {
    constructor() {
        super();

        this.errors = {
            EmailAlreadyExistException: EmailAlreadyExistError,
            InvalidEmailException: InvalidEmailError
        };
    }


    /**
     * @api {post} /university/subscribe Add subscriber
     * @apiVersion 1.0.0
     * @apiName addSubscriber
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} email      Email.
     * @apiSuccess {String} status     Status.
     */
    public async actionCreate(actionContext: any) {
        const result: any = await(service.create(
            actionContext.request.body.id,
            actionContext.request.body.email
        ));
        return {
            id: result.id,
            email: result['email_address'],
            status: result.status
        };
    }
}

export {SubscriptionController}
