'use strict';

var async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    Sequielize = require('sequelize');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'additionalEducation'
};


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
service.create = async(function(params) {
    return models.AdditionalEducation.create(params);
});


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
service.update = async(function(id, params) {
    var instance = await(models.AdditionalEducation({
        where: {
            id: id
        }
    }));

    return instance ? instance.update(params) : null;
});


/**
 * Return all additional education entries
 * @return {Promise<Array<models.AdditionalEducation>>}
 */
service.getAll = async(function() {
    return models.AdditionalEducation.findAll();
});


/**
 * @param {number} schoolId
 * @return {Promise<Array<Oobject>>}
 */
service.findBySchoolId = async(function(schoolId) {
    return models.AdditionalEducation.findAll({
        where: {
            schoolId: schoolId
        },
        attributes: [
            'category',
            'sphere'
        ]
    });
});


/**
 * Delete all additional educations
 */
service.deleteAll = async(function() {
    models.AdditionalEducation.destroy({
        where: {}
    });
});


/**
 * Create additional education sphere with given params
 * @param {{
 *     name: string,
 *     popularity: number
 * }}
 * @return {Promise<models.AdditionalEducationSphere>}
 */
service.createSphere = async(function(params) {
    return models.AdditionalEducationSphere.create(params);
});


/**
 * Return array of additional education spheres,
 * with name containing given name string
 * @param {string} name
 * @return {Array<models.AdditionalEducationSphere>}
 */
service.searchSphereByName = async(function(name) {
    return await(models.AdditionalEducationSphere.findAll({
        where: {
            name: {
                $iLike: '%' + name + '%'
            }
        }
    }));
});


/**
 * Return array of most popular addition education spheres
 * by their popularity
 * @param {number=} opt_amount
 * @return {Array<models.AdditionalEducationSphere>}
 */
service.getPopularSpheres = async(function(opt_amount) {
    return await(models.AdditionalEducationSphere.findAll({
        limit: opt_amount || 6,
        order: [['popularity', 'DESC']]
    }));
});


/**
 * Get additional education instances with unique spheres, filtered by
 * given schoolId
 * @param {number} schoolId
 * @return {Array<models.AdditionalEducation>}
 */
service.getUniqueSpheresBySchoolId = async(function(schoolId) {
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
});

module.exports = service;
