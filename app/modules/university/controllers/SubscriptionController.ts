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
     * @api {post} /program/subscribe Add subscriber
     * @apiVersion 1.0.0
     * @apiName addSubscriber
     *
     * @apiSuccess {Object} subsciber
     * @apiSuccess {Number} subsciber.id
     * @apiSuccess {String} subsciber.email
     * @apiSuccess {String} subsciber.status
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": "76234da8e",
     *         "email": "123qwe@yandex.ru",
     *         "status": "subscribed"
     *     }
     *
     * @apiError (400) EmailAlreadyExistError Email already exist.
     * @apiError (422) EmailAlreadyExistError Email is invalid.
     */
    public async actionCreate(actionContext: any) {
        const result = await(service.create(
            actionContext.data.id,
            actionContext.data.email
        ));

        return {
            id: result.data['merge_fields']['PROGRAM_ID'],
            email: result.data['email_address'],
            status: result.data.status
        };
    }
}

export {SubscriptionController}
