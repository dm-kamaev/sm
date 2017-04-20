const logger = require('../../../components/logger/logger').getLogger('app');

import {QueryParams} from '../types/programSearchLayout';

import {Service, RequestParams} from '../../common/services/Service';
import {SuggestProgram, BackendListProgram} from '../types/program';

import {ProgramNameIsShorter} from './exceptions/ProgramNameIsShorter';

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

    public async findByParams(
            queryParams: QueryParams): Promise<BackendListProgram> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}`,
            method: 'get',
            params: queryParams
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    protected handleError(error: any): void {
        const data = error.data || [];
        data.map(errorItem => {
            const code = errorItem.code;

            switch (code) {
            case 'ProgramNameIsShorter':
                throw new ProgramNameIsShorter();
            }
        });
        logger.critical(error);
        throw error;
    }
}

export const searchService = new SearchService();
