const logger = require('../../../components/logger/logger').getLogger('app');

import {
    SearchParams,
    BackendEgeSearchParam,
    BackendSearchParams
} from '../types/programSearch';

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
        const egeSubjects = queryParams.egeSubjects || [];
        const ege: BackendEgeSearchParam[] = egeSubjects.map(
            (subjectId) => {
                const subjectResult = queryParams.egeResults.find(
                    (result) => result.subjectId == subjectId
                );

                const value = subjectResult ?
                    Number(subjectResult.value) :
                    100;

                return {
                    [subjectId]: value
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

