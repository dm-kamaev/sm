'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const squel = require('squel').useFlavour('postgres');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    sequelize = require('../../../../app/components/db'),
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
 * @return {Array<{
 *     id: number,
 *     name: string,
 *     courseCount: number,
 *     departmentCount: number,
 *     updatedAt: Date
 * }>}
 */
service.getAll = async(function() {
    let query = squel.select({autoQuoteAliasNames: true})
        .from('course_brand')
        .field('course_brand.id')
        .field('course_brand.name')
        .field('COUNT(course.id)', 'courseCount')
        .field('COUNT(course_department.id)', 'departmentCount')
        .field('course_brand.updated_at', 'updatedAt')
        .left_join('course', null, 'course_brand.id = course.brand_id')
        .left_join('course_option', null, 'course.id = course_option.course_id')
        .left_join(
            'course_option_course_department',
            null,
            'course_option.id = ' +
                'course_option_course_department.course_option_id'
        )
        .left_join(
            'course_department',
            null,
            'course_option_course_department.course_department_id = ' +
                'course_department.id'
        )
        .group('course_brand.id')
        .toString();

    return await(sequelize.query(
        query, {
            type: sequelize.QueryTypes.SELECT
        }
    ));
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
