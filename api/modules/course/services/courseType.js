'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel');

const models = require('../../../../app/components/models').all,
    sequelize = require('../../../../app/components/db');

let service = {
    name: 'courseType'
};

/**
 * @param {{
 *     categoryId: number,
 *     name: string
 * }} data
 * @return {CourseType}
 */
service.create = async(function(data) {
    return await(models.CourseType.findOrCreate({
        where: {
            categoryId: data.categoryId,
            name: data.name
        }
    }))[0];
});

service.getAll = async(function() {
    let query = squel.select()
        .from('course_type')
        .field('course_type.id')
        .field('course_type.name')
        .field('course_category.id', 'categoryId')
        .field('course_category.name', 'categoryName')
        .field('true', 'isActive')
        .field('course_type.updated_at', 'updatedAt')
        .left_join(
            'course_category',
            null,
            'course_type.category_id = course_category.id'
        )
        .toString();

    return await(sequelize.query(
        query, {
            type: sequelize.QueryTypes.SELECT
        }
    ));
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


/**
 * Get types by category id
 * @return {Promise<Array<models.CourseType>>}
 */
service.getByCategory = async(function(categoryId) {
    return models.CourseType.findAll({
        where: {
            categoryId: categoryId
        },
        raw: true
    });
});

/**
 * @param  {number} id
 * @param  {{
 *     name: ?string,
 *     categoryId: ?number
 * }} data
 * @return {number}
 */
service.update = async(function(id, data) {
    return await(models.CourseType.update(data, {
        where: {
            id: id
        }
    }));
});

/**
 * @param {number} id
 */
service.delete = function(id) {
    await(models.CourseType.destroy({
        where: {
            id: id
        }
    }));
};

module.exports = service;
