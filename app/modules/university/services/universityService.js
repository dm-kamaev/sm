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
const UniversityNotFound_1 = require("./exceptions/UniversityNotFound");
const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');
const apiAddress = config.backendApi;
class UniversityService extends Service_1.Service {
    constructor() {
        super();
        this.baseUrl = `${apiAddress}/universities/api/university`;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                url: `${this.baseUrl}/${id}`,
                method: 'get'
            };
            const response = yield this.send(requestParams);
            return response.data;
        });
    }
    getIdByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                url: `${this.baseUrl}/alias/${encodeURI(alias)}`,
                method: 'get'
            };
            const response = yield this.send(requestParams);
            return response.data.universityId;
        });
    }
    handleError(error) {
        switch (error.status) {
            case 404:
                logger.critical(error.data);
                throw new UniversityNotFound_1.UniversityNotFound();
            default:
                throw error;
        }
    }
}
exports.universityService = new UniversityService();
