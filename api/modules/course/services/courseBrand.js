'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityType = require('../../entity/enums/entityType');

let service = {
    name: 'courseBrand'
};

/**
 * @param {{
 *     name: string,
 *     description: ?string
 * }} data
 * @return {CourseBrand}
 */
service.create = async(function(data) {
    let courseBrand = await(
        models.CourseBrand.findOrCreate({
            where: {
                name: data.name
            }
        })
    )[0]; // findOrCreate returns array where zero element is instance
    return await(courseBrand.update({
        description: data.description
    }));
});

/**
 * @return {Array<CourseBrand>}
 */
service.getAll = async(function() {
    return await(models.CourseBrand.findAll());
});

/**
 * @param {number} id
 * @return {CourseBrand}
 */
service.getById = async(function(id) {
    return await(models.CourseBrand.findOne({
        where: {
            id: id
        }
    }));
});

/**
 * @param  {number} id
 * @param  {{
 *     name: string,
 *     description: ?string
 * }} data
 * @return {Array<number>}
 */
service.update = async(function(id, data) {
    return await(models.CourseBrand.update(data, {
        where: {
            id: id
        }
    }));
});

/**
 * @param  {number} id
 */
service.delete = async(function(id) {
    let brand = await(models.CourseBrand.findOne({
        where: {
            id: id
        }
    }));
    await(brand.destroy());
});

/**
 * @param {CourseBrand} courseBrand
 */
service.deleteAlias = async(function(courseBrand) {
    await(services.page.delete(
        courseBrand.id,
        entityType.COURSE_BRAND
    ));
});

module.exports = service;
