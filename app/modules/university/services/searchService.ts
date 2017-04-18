const logger = require('../../../components/logger/logger').getLogger('app');

import {Service, RequestParams} from '../../common/services/Service';
import {SuggestProgram} from '../types/program';

class SearchService extends Service {
    constructor() {
        super();

        this.baseUrl += '/universities/api/program/search';
    }

    public async findByName(name: string): Promise<SuggestProgram[]> {
        const requestParams: RequestParams = {
            url: this.baseUrl + '/suggest',
            method: 'get',
            params: {searchString: name}
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    protected handleError(error: any): void {
        logger.critical(error);
        throw error;
    }
}

export const searchService = new SearchService();
