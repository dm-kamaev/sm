"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../../components/logger/logger').getLogger('app');
const Service_1 = require("../../common/services/Service");
const ProgramNameIsShorter_1 = require("./exceptions/ProgramNameIsShorter");
class SearchService extends Service_1.Service {
    constructor() {
        super();
        this.baseUrl += '/universities/api/program/search';
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                url: this.baseUrl + '/suggest',
                method: 'get',
                params: { searchString: name }
            };
            const response = yield this.send(requestParams);
            return response.data;
        });
    }
    findByParams(searchParams, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                url: `${this.baseUrl}`,
                method: 'get',
                params: this.initParams_(searchParams, limit)
            };
            const response = yield this.send(requestParams);
            return response.data;
        });
    }
    getCountResults(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                url: `${this.baseUrl}/count`,
                method: 'get',
                params: this.initParams_(searchParams)
            };
            const response = yield this.send(requestParams);
            return response.data;
        });
    }
    handleError(error) {
        const data = error.data || [];
        data.map(errorItem => {
            const code = errorItem.code;
            switch (code) {
                case 'ProgramNameIsShorter':
                    throw new ProgramNameIsShorter_1.ProgramNameIsShorter();
            }
        });
        logger.critical(error);
        throw error;
    }
    initParams_(searchParams, limit) {
        const egeSubjects = searchParams.egeSubjects || [];
        const ege = egeSubjects.map((subjectId) => {
            const subjectResult = searchParams.egeResults.find((result) => result.subjectId == subjectId);
            const value = subjectResult ?
                Number(subjectResult.value) :
                100;
            return {
                [subjectId]: value
            };
        });
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
exports.searchService = new SearchService();
