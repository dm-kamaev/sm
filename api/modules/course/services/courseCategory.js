'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel'),
    lodash = require('lodash');

const services = require('../../../../app/components/services').all,
    models = require('../../../../app/components/models').all,
    sequelize = require('../../../../app/components/db');

const entityType = require('../../entity/enums/entityType'),
    categoryPrice = require('../enums/categoryPrice');

const CATEGORY = 'course_category',
    DEFAULT_COST_FIELD = categoryPrice.COST_PER_HOUR;

let service = {
    name: 'courseCategory'
};

/**
 * Delete alias for given course category
 * @param {models.CourseCategory} courseCategory
 */
service.deleteAlias = async(function(courseCategory) {
    await(services.page.delete(
        courseCategory.id, entityType.COURSE_CATEGORY
    ));
});

/**
 * @param  {string} name
 * @return {CourseCategory}
 */
service.findOrCreate = async(function(name) {
    return await(models.CourseCategory.findOrCreate({
        where: {
            name: name
        }
    }))[0];
});

/**
 * @param {{
 *     isActive: ?boolean
 * }} opt_params
 * @return {Array<CourseCategory>}
 */
service.getAll = async(function(opt_params) {
    let query = squel.select()
        .from(CATEGORY)
        .field(`${CATEGORY}.id`)
        .field(`${CATEGORY}.name`)
        .field(`${CATEGORY}.is_active`, 'isActive')
        .field('count(course.id)', 'courseCount')
        .field(`${CATEGORY}.filters`)
        .field(`${CATEGORY}.price_type`, 'priceType')
        .field(`${CATEGORY}.updated_at`, 'updatedAt')
        .left_join(
            'course_type',
            null,
            `${CATEGORY}.id = course_type.category_id`
        )
        .left_join('course', null, 'course_type.id = course.type')
        .group(`${CATEGORY}.id`);

    if (opt_params && opt_params.isActive) {
        query.where('is_active = true');
    }

    return await(sequelize.query(
        query.toString(), {
            type: sequelize.QueryTypes.SELECT
        }
    ));
});

/**
 * Get category by alias
 * @param {string} alias
 * @return {models.CourseCategory}
 */
service.getByAlias = async(function(alias) {
    let page = await(services.page.getByAlias(
            alias, entityType.COURSE_CATEGORY
        )),
        category = null;

    if (page) {
        category = await(service.getById(page.entityId));

        if (!category.isActive) {
            category = null;
        }
    }

    return category;
});

/**
 * @param  {number} id
 * @return {CourseCategory}
 */
service.getById = async(function(id) {
    return await(models.CourseCategory.findOne({
        where: {
            id: id
        }
    }));
});

/**
 * @param  {{
 *     name: string,
 *     isActive: ?boolean,
 *     filters: Array<string>
 * }} data
 * @return {CourseCategory}
 */
service.create = async(function(data) {
    return await(models.CourseCategory.create({
        name: data.name,
        isActive: data.isActive,
        filters: data.filters,
        priceType: data.priceType
    }));
});

/**
 * @param  {number} id
 * @param  {{
 *     name: string,
 *     isActive: ?boolean,
 *     filters: Array<string>
 * }} data
 * @return {number}
 */
service.update = async(function(id, data) {
    return await(models.CourseCategory.update({
        name: data.name,
        isActive: data.isActive,
        filters: data.filters,
        priceType: data.priceType
    }, {
        where: {
            id: id
        },
        individualHooks: true
    }));
});

/**
 * @param {number} id
 */
service.delete = async(function(id) {
    let category = await(service.getById(id));
    await(category.destroy());
});

/**
 * Delete alias for given course category
 * @param {models.CourseCategory} courseCategory
 */
service.deleteAlias = async(function(courseCategory) {
    await(services.page.delete(
        courseCategory.id, entityType.COURSE_CATEGORY
    ));
});

/**
 * @return {Array<Page>}
 */
service.getAliases = async(function() {
    return await(services.page.getAllAliases(entityType.COURSE_CATEGORY));
});

/**
 * @param  {Array<CourseCategory>=} opt_categories
 * @return {string}
 */
service.getCostField = function(opt_categories) {
    let result;
    if (opt_categories && opt_categories.length == 1) {
        result = lodash.camelCase(opt_categories[0].priceType);
    } else {
        result = lodash.camelCase(DEFAULT_COST_FIELD);
    }
    return result;
};

module.exports = service;
