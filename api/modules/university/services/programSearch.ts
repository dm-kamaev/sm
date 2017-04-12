import {ProgramSearchQuery} from '../lib/ProgramSearch';

import {QueryParams, SearchParams} from '../types/programSearch';

class ProgramSearch {
    public converSearchParams(queryParams: QueryParams): SearchParams {
        return {
            limit: Number(queryParams.limit),
            page: Number(queryParams.page),
            sortType: Number(queryParams.sortType),
            searchString: queryParams.searchString,
            cityId: Number(queryParams.cityId),
            ege: this.stringToNumberArray_(queryParams.ege),
            payType: this.stringToNumberArray_(queryParams.payType),
            majors: this.stringToNumberArray_(queryParams.majors),
            discount: Boolean(queryParams.discount),
            exchangeProgram: Boolean(queryParams.exchangeProgram),
            militaryDepartment: Boolean(queryParams.militaryDepartment),
            dormitory: Boolean(queryParams.dormitory),
            maxPrice: Number(queryParams.maxPrice),
            maxPassScore: Number(queryParams.maxPassScore)
        };
    }

    public getListSearchQuery(params: SearchParams): string {
        const queryBuilder = new ProgramSearchQuery();
        return queryBuilder
            .setLimit(params.limit)
            .setOffset(params.page * params.limit || 0)
            .setSortType(params.sortType)
            .setSearchString(params.searchString)
            .setCity(params.cityId)
            .setEge(params.ege)
            .setPayType(params.payType)
            .setMajors(params.majors)
            .setDiscount(params.discount)
            .setExchangeProgram(params.exchangeProgram)
            .setMilitaryDepartment(params.militaryDepartment)
            .setDormitory(params.dormitory)
            .setMaxPrice(params.maxPrice)
            .setMaxPassScore(params.maxPassScore)
            .getQuery();
    }

    private stringToNumberArray_(
            value: string | undefined): Array<number> | undefined {
        return value && value.split(',').map(Number);
    }
}

export const programSearchService = new ProgramSearch();
