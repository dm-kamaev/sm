/**
 * @fileOverview Services to operate with specialized classes types
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const async = require('asyncawait/async'), await = require('asyncawait/await');
const models = require('../../../../app/components/models').all;
const specializedClassType_1 = require("../models/specializedClassType");
class Service {
    constructor() {
        this.name = 'specializedClasses';
    }
    /**
     * Create one scpecialized class type with given data and return it
     * @param {{
     *     name: (string|undefined),
     *     popularity: (number|undefined)
     * }} data
     * @return {models.SpecializedClassType}
     */
    createType(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models.SpecializedClassType.create(data);
        });
    }
    /**
     * Return all possible specialized class types
     * @return {Array<models.SpecializedClassType>}
     */
    getAllTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield specializedClassType_1.Model.findAll({
                attributes: ['id', 'name']
            });
        });
    }
    /**
     * @param {Array<number>} typeIds
     * @return {Array<models.SpecializedClassType>}
     */
    getTypesBySearchParams(typeIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (typeIds.length) {
                result = this.getById(typeIds);
            }
            else {
                result = this.getPopularTypes();
            }
            return yield (result);
        });
    }
    ;
    /**
     * Return aray of specialized class types,
     * with name containing given name string
     * @param {string} name
     * @return {Array<models.SpecializedClassType>}
     */
    searchTypeByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (models.SpecializedClassType.findAll({
                where: {
                    name: {
                        $iLike: '%' + name + '%'
                    }
                }
            }));
        });
    }
    ;
    /**
     * Return array of most popular addition education spheres
     * by their popularity
     * @param {number=} optAmount
     * @return {Array<models.SpecializedClassType>}
     */
    getPopularTypes(optAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (models.SpecializedClassType.findAll({
                limit: optAmount || 6,
                order: [['popularity', 'DESC']]
            }));
        });
    }
    ;
    /**
     * Return specialized class types by given id
     * @param {(Array<number>|number)} ids
     * @return {
     *     (Array<models.SpecializedClassType>|
     *     models.SpecializedClassType)
     * }
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition;
            if (Array.isArray(id)) {
                condition = {
                    id: {
                        $in: id
                    }
                };
            }
            else {
                condition = {
                    id: id
                };
            }
            return yield (models.SpecializedClassType.findAll({
                attributes: ['id', 'name'],
                where: condition
            }));
        });
    }
    ;
}
exports.service = new Service();
