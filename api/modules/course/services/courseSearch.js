var CourseSearchQuery = require('../lib/CourseSearch');

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
