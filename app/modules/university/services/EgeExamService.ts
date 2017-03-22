import {Service, RequestParams} from '../../common/services/Service';
import {BackendEgeExam} from '../types/egeExam';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class EgeExamService extends Service {
    private programId: number;
    constructor(programId: number) {
        super();

        this.programId = programId;

        this.baseUrl =
            `${apiAddress}/universities/api/program/` +
            `${this.programId}/exam`;
    }

    public async getExams(): Promise<Array<BackendEgeExam>> {
        const params: RequestParams = {
            url: this.baseUrl,
            method: 'get'
        };

        const response = await this.send(params);
        return response.data;
    }

    protected handleError(error: any): void {
    }
}

export {EgeExamService};
