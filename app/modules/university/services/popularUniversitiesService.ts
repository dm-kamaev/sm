/**
 * @fileoverview Service for retrieve popular universities
 */

import {
    Service,
    RequestParams
} from '../../common/services/Service';

import {BackendUniversity} from '../types/university';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class PopularUniversitiesService extends Service {

    constructor() {
        super();

        this.baseUrl = `${apiAddress}/universities/api/universities/`;
    }

    public async getPopulars(): Promise<BackendUniversity[]> {
        const params: RequestParams = {
            url: this.baseUrl,
            method: 'get',
            params: {
                ids: [6, 11, 7, 14]
            }
        };

        const result = await this.send(params);

        return result.data;
    }

    protected handleError(error: any): void {
        logger.critical(error);
        throw error;
    }
}

export const popularUniversitiesService = new PopularUniversitiesService();
