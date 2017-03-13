'use strict';

const Sequielize = require('sequelize');
const models = require('../../../../app/components/models').all;
import {
    Model as AdditionalEducationSphereModel,
    AdditionalEducationSphereInstance
} from '../../school/models/additionalEducationSphere';

import {
    Model as AdditionalEducationModel,
    AdditionalEducationInstance
} from '../../school/models/additionalEducation';

class Service {
    public readonly name: string = 'additionalEducation';

    /**
     * @param {{
     *     schoolId: number,
     *     category: string,
     *     sphere: number,
     *     name: ?string,
     *     description: ?string,
     *     phone: ?string,
     *     contact: ?string,
     *     requirements: ?string,
     *     rawData: ?string
     * }} params
     * @return {Promise<Object>}
     */
    public async create(params) {
        return models.AdditionalEducation.create(params);
    }


    /**
     * Find, then update instance by id
     * @param {number} id
     * @param {{
     *     sphereId: (number|undefined),
     *     schoolId: (number|undefined),
     *     category: (string|undefined),
     *     name: (string|undefined),
     *     description (string|undefined),
     *     phone: (string|undefined),
     *     contact: (string|undefined),
     *     requirements: (string|undefined),
     *     rawData: (string|undefined)
     * }}
     * @return {?Promise<models.AdditionalEducation>}
     */
    public async update(id, params) {
        const instance = await(models.AdditionalEducation({
            where: {
                id: id
            }
        }));
        return instance ? instance.update(params) : null;
    }

    public async updateByData(where, data) {
        return await AdditionalEducationModel.update(where, data);
    }

    /**
     * Return all additional education entries
     * @return {Promise<Array<models.AdditionalEducation>>}
     */
    public async getAll(): Promise<AdditionalEducationInstance[]> {
        return await AdditionalEducationModel.findAll();
    }


    public async getAllByData(data): Promise<AdditionalEducationInstance[]> {
        return await AdditionalEducationModel.findAll(data);
    }

    public async getAllSpehereByData(
        data
    ): Promise<AdditionalEducationSphereInstance[]> {
        return await AdditionalEducationSphereModel.findAll(data);
    }


    /**
     * @param {number} schoolId
     * @return {Promise<Array<models.AdditionalEducation>>}
     */
    public async findBySchoolId(schoolId) {
        return models.AdditionalEducation.findAll({
            where: {
                schoolId: schoolId
            },
            attributes: [
                'category'
            ],
            include: {
                model: models.AdditionalEducationSphere,
                as: 'sphere'
            }
        });
    }

    /**
     * Delete additional educations by param
     */
    public async deleteByData(data): Promise<number> {
        return await AdditionalEducationModel.destroy(data);
    }

    public async delete() {
        models.AdditionalEducation.destroy({
            where: {}
        });
    }


    /**
     * Create additional education sphere with given params
     * @param {{
     *     name: string,
     *     popularity: number
     * }}
     * @return {Promise<models.AdditionalEducationSphere>}
     */
    public async createSphere(params) {
        return models.AdditionalEducationSphere.create(params);
    }



    /**
     * Return array of additional education spheres,
     * with name containing given name string
     * @param {string} name
     * @return {Array<models.AdditionalEducationSphere>}
     */
    public async searchSphereByName(name) {
        return await(models.AdditionalEducationSphere.findAll({
            where: {
                name: {
                    $iLike: '%' + name + '%'
                }
            }
        }));
    }


    /**
     * @param {Array<number>} sphereIds
     * @return {Array<models.AdditionalEducationSphere>}
     */
    public async getSpheresBySearchParams(sphereIds: Array<number>) {
        let result;

        if (sphereIds.length) {
            result = await this.getById(sphereIds);
        } else {
            result = await this.getPopularSpheres();
        }
        return await(result);
    }


    /**
     * Return array of most popular addition education spheres
     * by their popularity
     * @param {number=} opt_amount
     * @return {Array<models.AdditionalEducationSphere>}
     */
    public async getPopularSpheres(optAmount?: number) {
        return await(models.AdditionalEducationSphere.findAll({
            attributes: ['id', 'name'],
            limit: optAmount || 6,
            order: [['popularity', 'DESC']]
        }));
    }


    /**
     * Return additional education spheres by given id
     * @param {(Array<number>|number)} ids
     * @return {
     *     (Array<models.AdditionalEducationSphere>|
     *     models.AdditionalEducationSphere)
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

        return await(models.AdditionalEducationSphere.findAll(
            {
                attributes: ['id', 'name'],
                where: condition
            }
        ));
    }

    public async getUniqueSpheresBySchoolId(schoolId) {
        return await(models.AdditionalEducation.findAll(
            {
                attributes: [
                    [Sequielize.literal('DISTINCT "school_id"'), 'schoolId'],
                    'sphereId'
                ],
                where: {
                    schoolId: schoolId
                }
            }
        ));
    }
};

export const service = new Service();
