const CourseSearchQuery = require('../lib/CourseSearch');
const CourseSearchMapQuery = require('../lib/CourseSearchMap');

exports.name = 'courseSearch';

/**
 * @param {Object} searchParams
 * @param {number=} opt_limit
 * @return {string}
 */
exports.getSearchSql = function(searchParams, opt_limit) {
    return new CourseSearchQuery()
        .setLimit(opt_limit)
        .setOffset(searchParams.page * opt_limit || 0)
        .setSortType(searchParams.setSortType)
        .getQuery();
};

/**
 * Generate sql query for search for map with given searchParams
 * @param {Object} searchParams
 * @param {number} opt_limit
 * @return {string}
 */
exports.getSearchMapSql = function(searchParams, opt_limit) {
    return new CourseSearchMapQuery()
        .setLimit(opt_limit)
        .setOffset(searchParams.page * opt_limit || 0)
        .getQuery();
};
