import * as axios from 'axios';

const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

interface RequestParams {
    url: string;
    method: string;
    headers?: any;
    params?: any; // queryParams
    data?: any; // body
    auth?: {
        username: string;
        password: string;
    };
}

abstract class Service {
    protected baseUrl: string;

    constructor() {
        this.baseUrl = config.backendApi;
    }

    public async send(params: RequestParams): Promise<any|Array<any>> {
        this.log(params);
        return await this.makeRequest(params);
    }

    protected abstract handleError(error);

    private async makeRequest(params: RequestParams): Promise<any|Array<any>> {
        let res;

        try {
            res = await axios(params);
        } catch (error) {
            res = this.handleError(error);
        }

        return res;
    }

    private log(params: RequestParams) {
        logger.info(
            '%s %s\n%s',
            params.method.toUpperCase(),
            params.url,
            JSON.stringify(params.data || {})
        );
    }
}

export {Service, RequestParams};
