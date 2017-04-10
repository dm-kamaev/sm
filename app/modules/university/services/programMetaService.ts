import {Service, RequestParams} from '../../common/services/Service';
import {BackendProgramMeta} from '../types/programMeta';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;

class ProgramMetaService extends Service {
    constructor() {
        super();

        this.baseUrl = `${apiAddress}/universities/api/program`;
    }

    public async getById(id: number): Promise<BackendProgramMeta> {
        const params: RequestParams = {
            url: `${this.baseUrl}/${id}/pagemeta`,
            method: 'get'
        };

        const response = await this.send(params);
        return response.data || {};
    }

    protected handleError(error: any): (void|{}) {
        const data = error.data || [];

        data.forEach(errorItem => {
            const code = errorItem.code;

            switch (code) {
                case 'ProgramMetaNotFound':
                    break;
                default:
                    logger.debug(JSON.stringify(error.data));
                    throw error;
            }
        });

        return {};
    }
}

export const programMetaService = new ProgramMetaService();
