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
const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');
const apiAddress = config.backendApi;
class EntranceStatisticService extends Service_1.Service {
    constructor(programId) {
        super();
        this.programId = programId;
        this.baseUrl =
            `${apiAddress}/universities/api/program/` +
                `${this.programId}/statistic`;
    }
    getLast() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: `${this.baseUrl}/last`,
                method: 'get'
            };
            const response = yield this.send(params);
            return response.data;
        });
    }
    handleError(error) {
    }
}
exports.EntranceStatisticService = EntranceStatisticService;
