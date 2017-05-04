/**
 * @fileoverview Service for retrieve similar programs
 */

import {
    Service,
    RequestParams
} from '../../common/services/Service';

import {BackendSimilarProgram} from '../types/similarProgram';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class SimilarProgramsService extends Service {
    private programId: number;

    constructor(programId: number) {
        super();

        this.programId = programId;

        this.baseUrl = `${apiAddress}/universities/api/program/` +
            `${this.programId}/similar`;
    }

    public async getSimilar(): Promise<BackendSimilarProgram[]> {
        const params: RequestParams = {
            url: this.baseUrl,
            method: 'get'
        };

        const result = await this.send(params);
        return result.data;
    }

    protected handleError(error: any): void {
        logger.critical(error);
        throw error;
    }
}

export {SimilarProgramsService};
