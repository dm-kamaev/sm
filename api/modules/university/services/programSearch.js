"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramSearch_1 = require("../lib/ProgramSearch");
const ProgramCountSearch_1 = require("../lib/ProgramCountSearch");
class ProgramSearch {
    converSearchParams(queryParams) {
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
    getListSearchQuery(params) {
        const queryBuilder = new ProgramSearch_1.ProgramSearchQuery();
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
    getCountSearchQuery(params) {
        const queryBuilder = new ProgramCountSearch_1.ProgramCountSearchQuery();
        return queryBuilder
            .setLimit()
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
    stringToNumberArray_(value) {
        if (value) {
            return typeof value === 'string' ?
                [Number(value)] :
                value.map(Number);
        }
        else {
            return undefined;
        }
    }
    formatEge_(ege) {
        let egeResult;
        try {
            egeResult = typeof ege === 'string' ?
                [JSON.parse(ege)] :
                ege.map(egeItem => JSON.parse(egeItem));
        }
        catch (error) {
            egeResult = [];
        }
        return this.convertEge_(egeResult);
    }
    convertEge_(ege) {
        return ege.map(egeItem => {
            const subjectId = Number(Object.keys(egeItem)[0]);
            const egeSearchItem = {
                subjectId: subjectId,
                score: Number(egeItem[subjectId])
            };
            return egeSearchItem;
        });
    }
}
exports.programSearchService = new ProgramSearch();
