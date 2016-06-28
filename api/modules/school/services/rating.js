var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var service = {
    name: 'rating'
};


/**
 * Add rating row
 * @params {number} schoolId
 * @param {{
 *     score?: Array [number]
 * }} data
 * @return {Object} instance of Rating model
 */
service.add = async(function(schoolId, data) {
    data.schoolId = schoolId;
    return await(models.Rating.create(data));
});


/**
 * Update rating data
 * @param {number} ratingId
 * @param {{
 *     score: Array [number]
 * }} data
 * @return {Object} instance of Rating model
 */
service.update = async(function(ratingId, data) {
    var instance = await(service.getOneByData({id: ratingId}));
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of Rating model
 */
service.getAll = async(function() {
    return await(models.Rating.findAll());
});


/**
 * Get all data from table by data
 * @param {{
 *     id?: nimber,
 *     schoolId?: number,
 *     score?: Array [number]
 * }} data
 * @return {Object} instances of Rating model
 */
service.getAllByData = async(function(data) {
    return await(models.Rating.findAll({
        where: data
    }));
});


/**
 * Get one by id
 * @param {number} ratingId
 * @return {Object} instance of Rating model
 */
service.getById = async(function(ratingId) {
    return await(models.Rating.findOne({
        where: {id: ratingId}
    }));
});


/**
 * Delete rating instance
 * @param {number} ratingId
 */
service.delete = async(function(ratingId) {
    var instance = await(service.getById(ratingId));
    await(instance.destroy());
});


module.exports = service;
