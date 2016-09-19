var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'courseType'
};

/**
 * @param {string} name
 * @return {CourseType}
 */
service.create = async(function(name) {
    return await(models.CourseType.findOrCreate({
        where: {
            name: name
        }
    }))[0];
});

service.getAll = async(function() {
    return await(models.CourseType.findAll({
        attributes: ['id', 'name']
    }));
});

/**
 * Return array of most popular types by their popularity
 * @param {number=} opt_amount
 * @return {Array<models.CourseType>}
 */
service.getPopularTypes = async(function(opt_amount) {
    return await(models.CourseType.findAll({
        limit: opt_amount || 6,
        order: [['popularity', 'DESC']]
    }));
});

/**
 * @param {string} name
 * @return {Array<models.CourseType>}
 */
service.findByName = async(function(name) {
    return await(models.CourseType.findAll({
        where: {
            name: {
                $iLike: '%' + name + '%'
            }
        }
    }));
});

module.exports = service;
