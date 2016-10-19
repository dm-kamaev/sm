'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all,
    models = require('../../../../app/components/models').all;

const entityType = require('../../entity/enums/entityType');

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

module.exports = service;
