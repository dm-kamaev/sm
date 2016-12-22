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
 *     categories: Array<CourseCategory>,
 *     seoParams: SeoCourseList
 * }}
 */
service.getData = async(function(searchParams, opt_categoryId) {
    let categories = await(services.courseCategory.getAll({isActive: true}));

    return await({
        courses: services.course.list(searchParams, {
            limit: SEARCH_CHUNK_SIZE
        }),
        mapCourses: services.course.listMap(searchParams, SEARCH_CHUNK_SIZE),
        mapPosition: services.map.getPositionParams(searchParams),
        categories: categories,
        filtersData: {
            [filterName.TYPE]: services.courseType.getAll(),
            [filterName.CATEGORY]: categories
        },
        seoParams: services.seoCourseList.getByCategoryId(opt_categoryId) || {}
    });
});

module.exports = service;
