import {Service, RequestParams} from '../../common/services/Service';
import {ProgramNotFound} from './exceptions/ProgramNotFound';
import {BackendProgram} from '../types/program';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class ProgramService extends Service {
    constructor() {
        super();

        this.baseUrl = `${apiAddress}/universities/api/program`;
    }

    public async getById(id: number): Promise<BackendProgram> {
        const params: RequestParams = {
            url: `${this.baseUrl}/${id}`,
            method: 'get'
        };

        const response = await this.send(params);
        return response.data;
    }

    public async getIdByAlias(
            programAlias: string, universityAlias: string): Promise<number> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}/alias/${encodeURI(programAlias)}`,
            method: 'get',
            params: {universityAlias}
        };

        const response = await this.send(requestParams);
        return response.data.programId;
    }

    protected handleError(error: any): void {
        switch (error.status) {
        case 404:
            logger.critical(error.data);
            throw new ProgramNotFound();
        default:
            throw error;
        }
    }
}

export const programService = new ProgramService();
