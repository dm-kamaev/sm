/**
 * @fileOverview Services to operate with specialized classes types
 */

'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;
import {
    Model as SpecializedClassTypeModel,
    SpecializedClassTypeInstance
} from '../models/specializedClassType';

class Service {
    public readonly name: string = 'specializedClasses';

    /**
     * Create one scpecialized class type with given data and return it
     * @param {{
     *     name: (string|undefined),
     *     popularity: (number|undefined)
     * }} data
     * @return {models.SpecializedClassType}
     */
    public async createType(data) {
        return await models.SpecializedClassType.create(data);
    }


    /**
     * Return all possible specialized class types
     * @return {Array<models.SpecializedClassType>}
     */
    public async getAllTypes(): Promise<SpecializedClassTypeInstance[]> {
        return await SpecializedClassTypeModel.findAll({
            attributes: ['id', 'name']
        });
    }


    /**
     * @param {Array<number>} typeIds
     * @return {Array<models.SpecializedClassType>}
     */
    public async getTypesBySearchParams(typeIds) {
        let result;

        if (typeIds.length) {
            result = this.getById(typeIds);
        } else {
            result = this.getPopularTypes();
        }

        return await(result);
    };

    /**
     * Return aray of specialized class types,
     * with name containing given name string
     * @param {string} name
     * @return {Array<models.SpecializedClassType>}
     */
    public async searchTypeByName(name) {
        return await(models.SpecializedClassType.findAll({
            where: {
                name: {
                    $iLike: '%' + name + '%'
                }
            }
        }));
    };

    /**
     * Return array of most popular addition education spheres
     * by their popularity
     * @param {number=} optAmount
     * @return {Array<models.SpecializedClassType>}
     */
    public async getPopularTypes(optAmount?) {
        return await(models.SpecializedClassType.findAll({
            limit: optAmount || 6,
            order: [['popularity', 'DESC']]
        }));
    };


    /**
     * Return specialized class types by given id
     * @param {(Array<number>|number)} ids
     * @return {
     *     (Array<models.SpecializedClassType>|
     *     models.SpecializedClassType)
     * }
     */
    public async getById(id) {
        let condition;

        if (Array.isArray(id)) {
            condition = {
                id: {
                    $in: id
                }
            };
        } else {
            condition = {
                id: id
            };
        }

        return await(models.SpecializedClassType.findAll(
            {
                attributes: ['id', 'name'],
                where: condition
            }
        ));
    };

}

export const service = new Service();