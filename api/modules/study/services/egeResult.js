var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

exports.name = 'egeResult';


/**
 * Add egeResult row
 * @param {number} schoolId
 * @param {number} subjectId
 * @param {{
 *     year!: number,
 *     result!: number
 * }} data
 * @return {Object} instance of EgeResult model
 */
exports.add = async(function(schoolId, subjectId, data) {
    data.schoolId = schoolId;
    data.subjectId = subjectId;
    return await(models.EgeResult.create(data));
});


/**
 * Uppdate egeResult data
 * @param {number} egeId
 * @param {{
 *     year: number,
 *     result: number
 * }} data
 * @return {Object} instance of EgeResult model
 */
exports.update = async(function(egeId, data) {
    var instance = await(exports.getById(egeId));
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of EgeResult model
 */
exports.getAll = async(function() {
    return await(models.EgeResult.findAll());
});


/**
 * Get all data from table by data
 * @param {{
 *     id?: number,
 *     school_id?: number,
 *     subject_id?: number,
 *     year?: number,
 *     result?: number
 * }} data
 * @return {Object} instances of EgeResult model
 */
exports.getAllByData = async(function(data) {
    return await(models.EgeResult.findAll({
        where: data
    }));
});

/**
 * Get one data from table by school id
 * @param {number} schoolId
 * @return {Object} instance of EgeResult model
 */
exports.getAllBySchoolId = async(function(schoolId) {
    return await(models.EgeResult.findAll({
        where: {schoolId: schoolId},
        include: [
            {
                model: models.Subject,
                as: 'subject'
            }
        ],
        order: [['year', 'ASC']]
    }));
});


/**
 * Get one data from table by data
 * @param {number} egeId
 * @return {Object} instance of EgeResult model
 */
exports.getById = async(function(egeId) {
    return await(models.EgeResult.findOne({
        where: {id: egeId}
    }));
});


/**
 * Delete egeResult instance
 * @param {number} ege_id
 */
exports.delete = async(function(egeId) {
    var instance = await(exports.getById(egeId));
    await(instance.destroy());
});
