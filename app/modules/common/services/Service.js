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
const axios = require("axios");
const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');
class Service {
    constructor() {
        this.baseUrl = config.backendApi;
    }
    send(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log(params);
            return yield this.makeRequest(params);
        });
    }
    makeRequest(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = yield axios(params);
            }
            catch (error) {
                res = this.handleError(error);
            }
            return res;
        });
    }
    log(params) {
        logger.info('%s %s\n%s', params.method.toUpperCase(), params.url, JSON.stringify(params.data || {}));
    }
}
exports.Service = Service;
