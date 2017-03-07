const axios = require('axios');
const mailChimp: any = require('../../../config/config.json').mailChimp;

const mailChimpUrl: string = `https://${mailChimp.dc}.api.mailchimp.com/3.0` +
    `/lists/${mailChimp.listId}/members`;

import {EmailAlreadyExist} from './exceptions/EmailAlreadyExist';

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
            throw new EmailAlreadyExist(email);
        }
        return response;
    }
}

export const service = new SubscriptionService();
