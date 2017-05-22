import {Service, RequestParams} from '../../common/services/Service';
const logger = require('../../../components/logger/logger').getLogger('app');

import {BackendCity} from '../types/city';

class CityService extends Service {
    constructor() {
        super();

        this.baseUrl += '/universities/api/cities';
    }

    public async getAllSortedByProgramCount(): Promise<BackendCity[]> {
        const params: RequestParams = {
            url: this.baseUrl + '/program',
            method: 'get'
        };
        const response = await this.send(params);
        return response.data;
    }

    public async findByName(name: string): Promise<BackendCity[]> {
        const params: RequestParams = {
            url: this.baseUrl,
            method: 'get',
            params: {name}
        };
        const response = await this.send(params);
        return response.data;
    }

    protected handleError(error) {
        logger.critical(error);
        throw error;
    }
}

export const cityService = new CityService();
