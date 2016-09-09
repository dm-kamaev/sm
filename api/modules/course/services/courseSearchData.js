const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    CourseSearchQuery = require('../lib/CourseSearch');

var service = {
    name: 'courseSearchData'
};

/**
 * @param {Object} searchParams
 * @param {number=} opt_limit
 * @return {string}
 */
service.getSearchSql = function(searchParams, opt_limit) {
    return new CourseSearchQuery()
        .setLimit(opt_limit)
        .setOffset(searchParams.page * opt_limit || 0)
        .setSortType(searchParams.setSortType)
        .getQuery();
};

/**
 * @return {Array<CourseSearch>}
 */
service.getAll = async(function() {
    return await(models.CourseSearchData.findAll());
});

/**
 * @param {Object} {{
 *     courseId: number,
 *     values: Array<number>,
 *     type: string
 * }}
 * @return {CourseSearchData}
 */
service.create = async(function(data) {
    return await(models.CourseSearchData.create(data));
});

/**
 * @param  {number} id
 * @param  {Object} data
 * @return {CourseSearchData}
 */
service.update = function(id, data) {
    return await(models.CourseSearchData.update(data, {
        where: {
            id: id
        }
    }));
};

module.exports = service;
