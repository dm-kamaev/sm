var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

exports.name = 'giaResult';

/**
 * Add giaResult row
 * @param {number} schoolId
 * @param {number} subjectId
 * @param {{
 *     count!: number,
 *     result!: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
exports.add = async(function(schoolId, subjectId, data) {
    data.schoolId = schoolId;
    data.subjectId = subjectId;
    return await(models.GiaResult.create(data));
});


/**
 * Uppdate giaResult data
 * @param {number} giaId
 * @param {{
 *     count: number,
 *     result: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
/**
 * Update gia data
 */
exports.update = async(function(giaId, data) {
    var instance = await(exports.getById(giaId));
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
 * @param {number} giaId
 * @return {Object} instance of GiaResult model
 */
exports.getById = async(function(giaId) {
    return await(models.GiaResult.findOne({
        where: {id: giaId}
    }));
});


/**
 * Delete giaResult instance
 * @param {number} giaId
 */
exports.delete = async(function(giaId) {
    var instance = await(exports.getById(giaId));
    await(instance.destroy());
});
