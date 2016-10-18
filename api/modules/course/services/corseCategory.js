'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

const entityType = require('../../entity/enums/entityType');

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

module.exports = service;
