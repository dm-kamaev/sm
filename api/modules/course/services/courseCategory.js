'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel');

const services = require('../../../../app/components/services').all,
    models = require('../../../../app/components/models').all,
    sequelize = require('../../../../app/components/db');

const entityType = require('../../entity/enums/entityType');

const CATEGORY = 'course_category';

let service = {
    name: 'courseCategory'
};

/**
 * Get one category by their id
 * @param {number} categoryId
 * @return {models.CourseCategory}
 */
service.getOne = async(function(categoryId) {
    return models.CourseCategory.findOne({
        where: {
            id: categoryId
        }
    });
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
 * @return {Array<CourseCategory>}
 */
service.getAll = async(function() {
    let query = squel.select()
        .from(CATEGORY)
        .field(`${CATEGORY}.id`)
        .field(`${CATEGORY}.name`)
        .field(`${CATEGORY}.is_active`, 'isActive')
        .field('count(course.id)', 'courseCount')
        .field(`${CATEGORY}.filters`)
        .field(`${CATEGORY}.updated_at`, 'updatedAt')
        .left_join(
            'course_type',
            null,
            `${CATEGORY}.id = course_type.category_id`
        )
        .left_join('course', null, 'course_type.id = course.type')
        .group(`${CATEGORY}.id`)
        .toString();

    return await(sequelize.query(
        query, {
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
        category = await(service.getOne(page.entityId));

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
    return await(models.CourseCategory.create(data));
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
    return await(models.CourseCategory.update(data, {
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

module.exports = service;
