var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

exports.name = 'giaResult';

/**
 * Add giaResult row
 * @param {number} school_id
 * @param {number} subject_id
 * @param {{
 *     count!: number,
 *     result!: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
exports.add = async(function(school_id, subject_id, data) {
    data.school_id = school_id;
    data.subject_id = subject_id;
    return await(models.GiaResult.create(data));
});


/**
 * Uppdate giaResult data
 * @param {number} gia_id
 * @param {{
 *     count: number,
 *     result: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
/**
 * Update gia data
 */
exports.update = async(function(gia_id, data) {
    var instance = await(exports.getById(gia_id));
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of GiaResult model
 */
exports.getAll = async(function() {
    return await(models.GiaResult.findAll());
});


/**
 * Get all data from table by data
 * @param {{
 *     id?: nimber,
 *     school_id?: number,
 *     subject_id?: number,
 *     count?: number,
 *     result?: number
 * }} data
 * @return {Object} instances of GiaResult model
 */
exports.getAllByData = async(function(data) {
    return await(models.GiaResult.findAll({
        where: data
    }));
});

/**
 * Get one data from table by school id
 * @param {number} schoolId
 * @return {Object} instance of GiaResult model
 */
exports.getAllBySchoolId = async(function(schoolId) {
    return await(models.GiaResult.findAll({
        where: {schoolId: schoolId},
        include: [
            {
                model: models.Subject,
                as: 'subject'
            }
        ]
    }));
});

/**
 * Get one data from table by data
 * @param {number} gia_id
 * @return {Object} instance of GiaResult model
 */
exports.getById = async(function(gia_id) {
    return await(models.GiaResult.findOne({
        where: {id: gia_id}
    }));
});


/**
 * Delete giaResult instance
 * @param {number} gia_id
 */
exports.delete = async(function(gia_id) {
    var instance = await(exports.getById(gia_id));
    await(instance.destroy());
});
