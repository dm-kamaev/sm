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
const Service_1 = require("../../common/services/Service");
const logger = require('../../../components/logger/logger').getLogger('app');
class CityService extends Service_1.Service {
    constructor() {
        super();
        this.baseUrl += '/universities/api/cities';
    }
    getAllSortedByProgramCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: this.baseUrl + '/program',
                method: 'get'
            };
            const response = yield this.send(params);
            return response.data;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: this.baseUrl,
                method: 'get',
                params: { name }
            };
            const response = yield this.send(params);
            return response.data;
        });
    }
    handleError(error) {
        logger.critical(error);
        throw error;
    }
}
exports.cityService = new CityService();
