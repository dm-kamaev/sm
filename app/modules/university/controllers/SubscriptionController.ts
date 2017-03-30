import {LegacyController} from '../../../../api/components/interface';
import {service} from '../services/subscriptionService';

const Controller: LegacyController = require('nodules/controller').Controller;

import {InvalidEmail as InvalidEmailError}
    from './errors/InvalidEmail';

import {MailChimpErrorTitle} from '../constants/MailChimpErrorTitle';

class SubscriptionController extends Controller {
    constructor() {
        super();

        this.errors = {
            InvalidEmailException: InvalidEmailError
        };
    }


    /**
     * @apiDefine InvalidEmailError
     * @apiError (422) InvalidEmailError Invalid email
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Unprocessable Entity
     *      [{
     *           "code": "InvalidEmail",
     *           "message": "Некорректный email"
     *      }]
     */

    /**
     * @api {post} /program/subscribe Add subscriber
     * @apiVersion 1.0.0
     * @apiName addSubscriber
     *
     * @apiSuccess {Object} subscriber
     * @apiSuccess {Number} subscriber.id
     * @apiSuccess {String} subscriber.email
     * @apiSuccess {String} subscriber.status
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": "76234da8e",
     *         "email": "123qwe@yandex.ru",
     *         "status": "subscribed"
     *     }
     *
     * @apiUse InvalidEmailError
     */
    public async actionCreate(actionContext: any) {
        const id = actionContext.data.id;
        const email = actionContext.data.email;

        let result = await service.create(id, email);

        if (result === MailChimpErrorTitle.EMAIL_EXIST) {
            const subscribers = await service.getList();

            const subscriber = subscribers.data.members
                .find(subscriber => subscriber['email_address'] === email);

            subscriber['merge_fields']['PROGRAM_LI'] += `, ${id}`;

            result = await service.update(
                subscriber.id,
                subscriber['merge_fields']['PROGRAM_LI']
            );
        }

        return {
            id: result.data.id,
            email: result.data['email_address'],
            status: result.data.status
        };
    }
}

export {SubscriptionController}
