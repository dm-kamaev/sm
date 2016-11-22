'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

const filterName = require('../enums/filterName');

const SEARCH_CHUNK_SIZE = 10;

let service = {
    name: 'search'
};

/**
 * Get all search data for given search parameters
 * @param {Object} searchParams
 * @param {?number} opt_categoryId
 * @return {{
 *     courses: Array<Course>,
 *     mapCourses: Array<Course>,
 *     mapPosition: Object,
 *     categories: Array<CourseCategory>
 * }}
 */
service.getData = async(function(searchParams, categoryId) {
    return await({
        courses: services.course.list(searchParams, SEARCH_CHUNK_SIZE),
        mapCourses: services.course.listMap(searchParams, SEARCH_CHUNK_SIZE),
        mapPosition: services.map.getPositionParams(searchParams),
        categories: services.courseCategory.getAll({isActive: true}),
        filtersData: {
            [filterName.TYPE]: services.courseType.getAll()
        },
        seoParams: services.seoCourseList.getByCategoryId(categoryId)
    });
});

module.exports = service;
