var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var service = {
    name: 'olimpResult'
};


/**
 * Add olympResult row
 * @param {number} school_id
 * @param {number} subject_id
 * @param {{
 *     type: 'всероссийская' || 'московская',
 *     stage: number,
 *     class: number,
 *     status: 'победитель' || 'призер',
 *     year: number
 * }} data
 * @return {Object} instance of OlimpResult model
 */
service.add = async(function(school_id, subject_id, data) {
    data.school_id = school_id;
    data.subject_id = subject_id;
    return await(models.OlimpResult.create(data));
});


/**
 * Uppdate olympResult data
 * @param {number} olymp_id
 * @param {{
 *     type?: 'всероссийская' || 'московская',
 *     stage?: number,
 *     class?: number,
 *     status?: 'победитель' || 'призер',
 *     year?: number
 * }} data
 * @return {Object} instance of OlimpResult model
 */
service.update = async(function(olymp_id, data) {
    var instance = await(service.getById(olymp_id));
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
 * @param {number} olymp_id
 * @return {Object} instance of OlimpResult model
 */
service.getById = async(function(olymp_id) {
    return await(models.OlimpResult.findOne({
        where: {id: olymp_id}
    }));
});


/**
 * Delete olympResult instance
 * @param {number} olymp_id
 */
service.delete = async(function(olymp_id) {
    var instance = await(service.getById(olymp_id));
    await(instance.destroy());
});


module.exports = service;
