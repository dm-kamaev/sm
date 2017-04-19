import * as querystring from 'querystring';

import {ProgramSearchQuery} from '../lib/ProgramSearch';

import {QueryParams, SearchParams, EgeSearch} from '../types/programSearch';

type QueryEge = {
    [key: string]: number
};

class ProgramSearch {
    public converSearchParams(queryParams: QueryParams): SearchParams {
        return {
            limit: Number(queryParams.limit),
            page: Number(queryParams.page),
            sortType: Number(queryParams.sortType),
            searchString: queryParams.searchString,
            cities: this.stringToNumberArray_(queryParams.cities),
            ege: this.formatEge_(queryParams.ege),
            payType: this.stringToNumberArray_(queryParams.payType),
            majors: this.stringToNumberArray_(queryParams.majors),
            discount: Boolean(queryParams.discount),
            features: this.stringToNumberArray_(queryParams.features),
            maxPrice: Number(queryParams.maxPrice)
        };
    }

    public getListSearchQuery(params: SearchParams): string {
        const queryBuilder = new ProgramSearchQuery();
        return queryBuilder
            .setLimit(params.limit)
            .setOffset(params.page * params.limit || 0)
            .setSortType(params.sortType)
            .setSearchString(params.searchString)
            .setCities(params.cities)
            .setEge(params.ege)
            .setPayType(params.payType)
            .setMajors(params.majors)
            .setDiscount(params.discount)
            .setFeatures(params.features)
            .setMaxPrice(params.maxPrice)
            .getQuery();
    }

    private stringToNumberArray_(
            value: string | undefined): Array<number> | undefined {
        return value && value.split(',').map(Number);
    }

    private formatEge_(ege: string): EgeSearch[] {
        let egeResult: QueryEge[];
        try {
            egeResult = JSON.parse(ege);
        } catch (error) {
            egeResult = [];
        }
        return this.convertEge_(egeResult);
    }

    private convertEge_(ege: QueryEge[]): EgeSearch[] {
        return ege.map(egeItem => {
            const subjectId: number = Number(Object.keys(egeItem)[0]);
            const egeSearchItem: EgeSearch = {
                subjectId: subjectId,
                score: Number(egeItem[subjectId])
            };
            return egeSearchItem;
        });
    }
}

export const programSearchService = new ProgramSearch();
