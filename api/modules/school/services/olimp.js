var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var service = {
    name: 'olimpResult'
};


/**
 * Add olympResult row
 * @param {number} schoolId
 * @param {number} subjectId
 * @param {{
 *     type: 'всероссийская' || 'московская',
 *     stage: number,
 *     class: number,
 *     status: 'победитель' || 'призер',
 *     year: number
 * }} data
 * @return {Object} instance of OlimpResult model
 */
service.add = async(function(schoolId, subjectId, data) {
    data.schoolId = schoolId;
    data.subjectId = subjectId;
    return await(models.OlimpResult.create(data));
});


/**
 * Uppdate olympResult data
 * @param {number} olympId
 * @param {{
 *     type?: 'всероссийская' || 'московская',
 *     stage?: number,
 *     class?: number,
 *     status?: 'победитель' || 'призер',
 *     year?: number
 * }} data
 * @return {Object} instance of OlimpResult model
 */
service.update = async(function(olympId, data) {
    var instance = await(service.getById(olympId));
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of OlimpResult model
 */
service.getAll = async(function() {
    return await(models.OlimpResult.findAll());
});


/**
 * Get all data from table by data
 * @param {{
 *     id?: nimber,
 *     school_id?: number,
 *     subject_id?: number,
 *     type?: 'всероссийская' || 'московская',
 *     stage?: number,
 *     class?: number,
 *     status?: 'победитель' || 'призер',
 *     year?: number
 * }} data
 * @return {Object} instances of OlimpResult model
 */
service.getAllByData = async(function(data) {
    return await(models.OlimpResult.findAll({
        where: data
    }));
});


/**
 * Get one data from table by data
 * @param {number} olympId
 * @return {Object} instance of OlimpResult model
 */
service.getById = async(function(olympId) {
    return await(models.OlimpResult.findOne({
        where: {id: olympId}
    }));
});


/**
 * Delete olympResult instance
 * @param {number} olympId
 */
service.delete = async(function(olympId) {
    var instance = await(service.getById(olympId));
    await(instance.destroy());
});


module.exports = service;
