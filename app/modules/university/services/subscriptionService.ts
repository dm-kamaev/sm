const mailChimp: any = require('../../../config/config.json').mailChimp;

const mailChimpUrl: string = `https://${mailChimp.dc}.api.mailchimp.com/3.0` +
    `/lists/${mailChimp.listId}/members`;

const INVALID_RESOURSE_ERROR: string = 'Invalid Resource';
const EMAIL_EXIST_ERROR: string = 'Member Exists';


import {EmailAlreadyExist} from './exceptions/EmailAlreadyExist';
import {InvalidEmail} from './exceptions/InvalidEmail';
import {Service, RequestParams} from '../../common/services/Service';

class SubscriptionService extends Service {
    public readonly name: string = 'subscriptionService';

    constructor() {
        super();
    }

    public async create(
        id: number,
        email: string
    ): Promise<any> {
        const params: RequestParams = {
            url: mailChimpUrl,
            method: 'post',
            data: {
                email_address: email,
                status: 'subscribed'
            },
            auth: {
                username: mailChimp.name,
                password: mailChimp.password
            }
        };

        return await(this.send(params));
    }

    protected handleError(error) {
        switch (error.data.title) {
        case INVALID_RESOURSE_ERROR:
            throw new InvalidEmail();
        case EMAIL_EXIST_ERROR:
            throw new EmailAlreadyExist();
        default:
            throw error;
        }
    }
}

export const service = new SubscriptionService();
