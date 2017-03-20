import {Service, RequestParams} from '../../common/services/Service';
import {UniversityNotFound} from './exceptions/UniversityNotFound';
import {BackendUniversity} from '../types/university';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class UniversityService extends Service {
    constructor() {
        super();

        this.baseUrl = `${apiAddress}/universities/api/university`;
    }

    public async getById(id: number): Promise<BackendUniversity> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}/${id}`,
            method: 'get'
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    public async getIdByAlias(alias: string): Promise<number> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}/${alias}`,
            method: 'get'
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    protected handleError(error: any): void {
        switch (error.status) {
        case 404:
            logger.critical(error.data);
            throw new UniversityNotFound();
        default:
            throw error;
        }
    }
}

export const universityService = new UniversityService();
