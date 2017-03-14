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
     * @apiSuccess {Object} subsciber
     * @apiSuccess {Number} subsciber.id
     * @apiSuccess {String} subsciber.email
     * @apiSuccess {String} subsciber.status
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *     "id": "76234da8e",
     *     "email": "123qwe@yandex.ru",
     *     "status": "subscribed"
     * }
     */
    public async actionCreate(actionContext: any) {
        const result = await(service.create(
            actionContext.request.body.id,
            actionContext.request.body.email
        ));

        return {
            id: result.data.id,
            email: result.data['email_address'],
            status: result.data.status
        };
    }
}

export {SubscriptionController}
