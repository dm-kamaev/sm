"use strict";
/**
 * @fileoverview Service for retrieve program major and dependent enities
 */
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
const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');
const apiAddress = config.backendApi;
class ProgramMajorService extends Service_1.Service {
    constructor() {
        super();
        this.baseUrl = `${apiAddress}/universities/api/programmajor`;
    }
    getPopular(count) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                method: 'get',
                url: `${this.baseUrl}/popular`,
                params: { count }
            };
            const result = yield this.send(params);
            return result.data;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                method: 'get',
                url: `${this.baseUrl}/search`,
                params: { name }
            };
            const result = yield this.send(params);
            return result.data;
        });
    }
    getAdvicedCourses(programMajorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                method: 'get',
                url: `${this.baseUrl}/${programMajorId}/advicedcourses`
            };
            const result = yield this.send(params);
            return result.data;
        });
    }
    handleError(error) {
        throw error;
    }
}
exports.programMajorService = new ProgramMajorService();
