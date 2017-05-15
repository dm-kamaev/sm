const logger = require('../../../components/logger/logger').getLogger('app');

import {
    SearchParams,
    BackendEgeSearchParam,
    BackendSearchParams
} from '../types/programSearch';

import {Service, RequestParams} from '../../common/services/Service';
import {BackendSuggestList, BackendProgramResults} from '../types/program';

import {ProgramNameIsShorter} from './exceptions/ProgramNameIsShorter';

class SearchService extends Service {
    constructor() {
        super();

        this.baseUrl += '/universities/api/program/search';
    }

    public async findByName(name: string): Promise<BackendSuggestList> {
        const requestParams: RequestParams = {
            url: this.baseUrl + '/suggest',
            method: 'get',
            params: {searchString: name}
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    public async findByParams(
            searchParams: SearchParams,
            limit?: number
    ): Promise<BackendProgramResults> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}`,
            method: 'get',
            params: this.initParams_(searchParams, limit)
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    public async getCountResults(searchParams: SearchParams
    ): Promise<BackendProgramResults> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}/count`,
            method: 'get',
            params: this.initParams_(searchParams)
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

    private initParams_(
            searchParams: SearchParams,
            limit?: number
    ): BackendSearchParams {
        const egeSubjects = searchParams.egeSubjects || [];
        const ege: BackendEgeSearchParam[] = egeSubjects.map(
            (subjectId) => {
                const subjectResult = searchParams.egeResults.find(
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
            cities: searchParams.cities,
            ege: ege,
            features: searchParams.features,
            majors: searchParams.majors,
            maxPrice: searchParams.maxPrice,
            payType: searchParams.payType,
            page: searchParams.page,
            sortType: searchParams.sortType,
            limit: limit,
        };
    }
}

export const searchService = new SearchService();
