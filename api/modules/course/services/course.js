var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var sequelize = require('../../../../app/components/db'),
    models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

var service = {
    name: 'course'
};

/**
 * @param {{
 *     name: string,
 *     description: ?string,
 *     fullInfo: ?string
 *     brandName: string,
 *     options: Array<{
 *         costPerHour: ?number,
 *         online: ?boolean,
 *         age: ?number,
 *         maxGroupSize: ?integer,
 *         nativeSpeaker: ?boolean,
 *         startDate: ?string,
 *         duration: ?string,
 *         schedule: Array<{
 *             startTime: ?string,
 *             endTime: ?string,
 *             day: ?number
 *         }>,
 *         departments: Array<{
 *             name: ?string,
 *             description: ?string,
 *             phone: ?string,
 *             address: string
 *         }
 *     }>
 * }} data
 * @return {Course}
 */
service.create = async(function(data) {
    var brand = await(services.courseBrand.create({
            name: data.brandName
        })),
        course = await(models.Course.create({
            name: data.name,
            brandId: brand.id,
            description: data.description,
            fullInfo: data.fullInfo
        }));
    course.options = data.options.map(option =>
        await(services.courseOption.create(course.id, option))
    );

    return course;
});

/**
 * @param {Object} searchParams
 * @param {number=} opt_limit
 * @return {Array<Object>}
 */
service.list = async(function(searchParams, opt_limit) {
    var searchString = services.courseSearch.getSearchSql(
        searchParams,
        opt_limit
    );

    var courses = await(sequelize.query(
        searchString, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return courses;
});

module.exports = service;
