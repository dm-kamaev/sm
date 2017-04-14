/**
 * @fileoverview Service for retrieve program major and dependent enities
 */

import {
    Service,
    RequestParams
} from '../../common/services/Service';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

import {BackendCourseAdviced} from '../types/programMajor';

class ProgramMajorService extends Service {
    constructor() {
        super();

        this.baseUrl = `${apiAddress}/universities/api/programmajor`;
    }


    public async getAdvicedCourses(
            programMajorId: number
    ): Promise<BackendCourseAdviced> {
        const params: RequestParams = {
            method: 'get',
            url: `${this.baseUrl}/${programMajorId}/advicedcourses`
        };

        const result = await this.send(params);
        return result.data;
    }


    protected handleError(error: any) {
        throw error;
    }
}

export const programMajorService = new ProgramMajorService();
