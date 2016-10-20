var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'courseType'
};

/**
 * @param {number} categoryId
 * @param {string} name
 * @return {CourseType}
 */
service.create = async(function(categoryId, name) {
    return await(models.CourseType.findOrCreate({
        where: {
            categoryId: categoryId,
            name: name
        }
    }))[0];
});

service.getAll = async(function() {
    return await(models.CourseType.findAll({
        attributes: ['id', 'name', 'updated_at'],
        include: [{
            attributes: ['id', 'name'],
            model: models.CourseCategory,
            as: 'category'
        }]
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

/**
 * @param  {number} id
 * @return {CourseType}
 */
service.getById = async(function(id) {
    return await(models.CourseType.findOne({
        attributes: ['id', 'name', 'categoryId'],
        where: {
            id: id
        }
    }));
});

module.exports = service;
