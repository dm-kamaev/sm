import {Service, RequestParams} from '../../common/services/Service';
import {BackendEgeExam, Subject} from '../types/egeExam';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class EgeExamService extends Service {
    private programId: number;
    constructor() {
        super();

        this.baseUrl = `${apiAddress}/universities/api`;
    }

    public async getProgramExams(
            programId: number): Promise<Array<BackendEgeExam>> {
        this.baseUrl += `/program/${programId}/exam`;
        const params: RequestParams = {
            url: this.baseUrl,
            method: 'get'
        };

        const response = await this.send(params);
        return response.data;
    }

    public async getExams(): Promise<Subject> {
        const params: RequestParams = {
            url: this.baseUrl + '/subject/ege',
            method: 'get'
        };
        const response = await this.send(params);
        return response.data;
    }

    protected handleError(error: any): void {
        logger.critical(error);
        throw error;
    }
}

export const egeExamService = new EgeExamService();
