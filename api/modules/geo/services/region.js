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
const Region_1 = require("../models/Region");
class RegionService {
    constructor() {
        this.name = 'region';
    }
    getByData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = params.attributes, where = params.where;
            return yield Region_1.Model.findOne({
                attributes,
                where,
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Region_1.Model.create(data);
        });
    }
}
exports.service = new RegionService();
