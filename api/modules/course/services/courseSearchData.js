const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    CourseSearchQuery = require('../lib/CourseSearch'),
    CourseSearchMapQuery = require('../lib/CourseSearchMap');

const entityType = require('../../entity/enums/entityType');

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
        .setAge(searchParams.age)
        .setCost(searchParams.cost)
        .setWeekdays(searchParams.weekdays)
        .setTime(searchParams.time)
        .setRegularity(searchParams.regularity)
        .setFormTraining(searchParams.formTraining)
        .setDuration(searchParams.duration)
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

/**
 * Generate sql query for search for map with given searchParams
 * @param {Object} searchParams
 * @param {number} opt_limit
 * @return {string}
 */
service.getSearchMapSql = function(searchParams, opt_limit) {
    return new CourseSearchMapQuery()
        .setLimit(opt_limit)
        .setOffset(searchParams.page * opt_limit || 0)
        .getQuery();
};

service.suggestSearch = function(searchString) {
    var resultIds = await(services.textSearchData.entitiesSearch(searchString, [
        entityType.COURSE,
        entityType.METRO,
        entityType.AREA,
        entityType.DISTRICT
    ]));

    return await({
        courses: services.course.getByIds(resultIds[entityType.COURSE] || []),
        areas: services.area.getByIds(resultIds[entityType.AREA] || []),
        metros: services.metro.getByIds(resultIds[entityType.METRO] || []),
        districts: services.district.getByIds(
            resultIds[entityType.DISTRICT] || []
        )
    });
};

module.exports = service;
