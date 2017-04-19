import {Service, RequestParams} from '../../common/services/Service';
import {BackendEntranceStatistic} from '../types/entranceStatistic';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class EntranceStatisticService extends Service {
    private programId: number;
    constructor(programId: number) {
        super();

        this.programId = programId;

        this.baseUrl =
            `${apiAddress}/universities/api/program/` +
            `${this.programId}/statistic`;
    }

    public async getLast(): Promise<BackendEntranceStatistic> {
        const params: RequestParams = {
            url: `${this.baseUrl}/last`,
            method: 'get'
        };

        const response = await this.send(params);
        return response.data;
    }

    protected handleError(error: any): void {
    }
}

export {EntranceStatisticService};
