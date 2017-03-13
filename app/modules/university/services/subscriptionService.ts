const axios = require('axios');
const mailChimp: any = require('../../../config/config.json').mailChimp;

const mailChimpUrl: string = `https://${mailChimp.dc}.api.mailchimp.com/3.0` +
    `/lists/${mailChimp.listId}/members`;

const INVALID_RESOURSE_ERROR: string = 'Invalid Resource';
const EMAIL_EXIST_ERROR: string = 'Member Exists';


import {EmailAlreadyExist} from './exceptions/EmailAlreadyExist';
import {InvalidEmail} from './exceptions/InvalidEmail';

interface Isubscriber {
    id: string; //"id": 1
    email: string; //"email": "dmitrsavk@yandex.ru"
    status: string; //"status": "subscribed"
}

interface IsubscriptionConfig {
    auth: {
        name: string;
        password: string;
    };
}

interface IsubscriptionData {
    email_address: string;
    status: string;
}

class SubscriptionService {
    public readonly name: string = 'subscriptionService';

    public async create(
        id: number,
        email: string
    ): Promise<Isubscriber> {
        let response: Isubscriber;

        const data: IsubscriptionData = {
            email_address: email,
            status: 'subscribed',
        };

        const config: IsubscriptionConfig = {
            auth: {
                name: mailChimp.name,
                password: mailChimp.password
            }
        };

        try {
            response = await(axios.post(mailChimpUrl, data, config));
        } catch (error) {
            switch (error.data.title) {
            case INVALID_RESOURSE_ERROR:
                throw new InvalidEmail(email);
            case EMAIL_EXIST_ERROR:
                throw new EmailAlreadyExist(email);
            default:
                throw error;
            }
        }
        return response;
    }
}

export const service = new SubscriptionService();
