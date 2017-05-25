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
/**
 * @fileOverview Service for make CRUD operations on model
 */
const Service_1 = require("../../common/services/Service");
const UserNotLoggedIn_1 = require("./exceptions/UserNotLoggedIn");
const lodash_1 = require("lodash");
const config = require('../../../config/config.json');
class UserService extends Service_1.Service {
    constructor() {
        super();
        this.baseUrl = config.userApi;
    }
    getUserFromRequest(request, params) {
        params = params || {};
        const user = request.user || null;
        if (!user && params.checkIsLoggedIn) {
            throw new UserNotLoggedIn_1.UserNotLoggedInException();
        }
        return user;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (Array.isArray(id)) {
                result = this.getAllByIds_(id);
            }
            else {
                result = this.getOneById_(id);
            }
            return yield result;
        });
    }
    handleError(error) {
        throw error;
    }
    getOneById_(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                url: `${this.baseUrl}/user/${id}`,
                method: 'get'
            };
            const response = yield this.send(requestParams);
            return response.data;
        });
    }
    getAllByIds_(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const notNullIds = ids.filter(id => Boolean(id));
            const uniqueIds = lodash_1.uniq(notNullIds);
            let result = [];
            if (uniqueIds.length > 0) {
                const formattedIds = uniqueIds
                    .map(id => String(id))
                    .reduce((previous, id) => `${previous},${id}`), requestParams = {
                    url: `${this.baseUrl}/users/?id=${formattedIds}`,
                    method: 'get'
                };
                const response = yield this.send(requestParams);
                result = response.data;
            }
            return result;
        });
    }
}
exports.userService = new UserService();
