const mailChimp: any = require('../../../config/config.json').mailChimp;

const mailChimpUrl: string = `https://${mailChimp.dc}.api.mailchimp.com/3.0` +
    `/lists/${mailChimp.listId}/members`;

const INVALID_RESOURSE_ERROR: string = 'Invalid Resource';
const EMAIL_EXIST_ERROR: string = 'Member Exists';


import {EmailAlreadyExist} from './exceptions/EmailAlreadyExist';
import {InvalidEmail} from './exceptions/InvalidEmail';
import {Service} from '../../common/services/service';

interface Isubscriber {
    id?: string; //"id": "1dasd23"
    email_address: string; //"email_address": "dmitrsavk@yandex.ru"
    status: string; //"status": "subscribed"
}

class SubscriptionService extends Service {
    public readonly name: string = 'subscriptionService';

    constructor() {
        super();
    }

    public async create(
        id: number,
        email: string
    ): Promise<Axios.AxiosXHR<Isubscriber>> {
        let response: Axios.AxiosXHR<Isubscriber>;

        const data: Isubscriber = {
            email_address: email,
            status: 'subscribed',
        };

        const config: Axios.AxiosXHRConfigBase<Isubscriber> = {
            auth: {
                username: mailChimp.name,
                password: mailChimp.password
            }
        };

        response = await(this.post(mailChimpUrl, data, config));

        return response;
    }

    handleError(error: any): void {
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
