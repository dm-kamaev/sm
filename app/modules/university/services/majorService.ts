import {Service, RequestParams} from '../../common/services/Service';
const logger = require('../../../components/logger/logger').getLogger('app');

import {PopularMajor} from '../types/major';

class MajorService extends Service {
    constructor() {
        super();

        this.baseUrl += '/universities/api/programmajor';
    }

    public async getPopular(): Promise<PopularMajor> {
        const params: RequestParams = {
            url: this.baseUrl + '/popular',
            method: 'get'
        };
        const response = await this.send(params);
        return response.data;
    }

    protected handleError(error) {
        logger.critical(error);
        throw error;
    }
}

export const majorService = new MajorService();
