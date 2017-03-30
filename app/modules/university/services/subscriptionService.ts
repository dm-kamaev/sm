const mailChimp: any = require('../../../config/config.json').mailChimp;

const mailChimpUrl: string = `https://${mailChimp.dc}.api.mailchimp.com/3.0` +
    `/lists/${mailChimp.listId}/members`;

import {MailChimpErrorTitle} from '../constants/MailChimpErrorTitle';

import {InvalidEmail} from './exceptions/InvalidEmail';
import {Service, RequestParams} from '../../common/services/Service';

class SubscriptionService extends Service {

    constructor() {
        super();
    }

    public async getList(): Promise<any> {
        const params: RequestParams = {
            url: mailChimpUrl,
            method: 'get',
            auth: {
                username: mailChimp.name,
                password: mailChimp.password
            }
        };

        return await this.send(params);
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
                status: 'subscribed',
                merge_fields: {
                    PROGRAM_LI: id.toString()
                }
            },
            auth: {
                username: mailChimp.name,
                password: mailChimp.password
            }
        };

        return await this.send(params);
    }

    public async update(
        id: number,
        programList: string
    ): Promise<any> {
        const params: RequestParams = {
            url: mailChimpUrl + `/${id}`,
            method: 'put',
            data: {
                merge_fields: {
                    PROGRAM_LI: programList
                }
            },
            auth: {
                username: mailChimp.name,
                password: mailChimp.password
            }
        };

        return await this.send(params);
    }

    protected handleError(error) {
        switch (error.data.title) {
        case MailChimpErrorTitle.INVALID_RESOURSE:
            throw new InvalidEmail();
        case MailChimpErrorTitle.EMAIL_EXIST:
            return MailChimpErrorTitle.EMAIL_EXIST;
        default:
            throw error;
        }
    }
}

export const service = new SubscriptionService();
