const logger = require('../../../components/logger/logger').getLogger('app');

<<<<<<< 6f11d6ea8c06b0113ba2e6d9e5869f15e2174760
import {QueryParams} from '../types/programSearch';
=======
import {
    SearchParams,
    BackendEgeSearchParam,
    BackendSearchParams
} from '../types/search';
>>>>>>> BP-2303 add types and search params transformation in search service

import {Service, RequestParams} from '../../common/services/Service';
import {SuggestProgram, BackendProgramResults} from '../types/program';

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
            queryParams: SearchParams): Promise<BackendProgramResults> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}`,
            method: 'get',
            params: this.initParams_(queryParams)
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

    private initParams_(queryParams: SearchParams): BackendSearchParams {
        const ege: BackendEgeSearchParam[] = queryParams.egeSubjects.map(
            (subjectId) => {
                const subjectResult = queryParams.egeResults.find(
                    (result) => result.subjectId == subjectId
                );

                return {
                    [subjectId]: subjectResult.value || 100
                };
            }
        );

        return {
            cities: queryParams.cities,
            ege: ege,
            features:queryParams.features,
            majors: queryParams.majors,
            maxPrice: queryParams.maxPrice,
            payType: queryParams.payType,
            page: queryParams.page,
            sortType: queryParams.sortType,
        };
    }
}

export const searchService = new SearchService();

