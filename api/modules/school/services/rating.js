var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var service = {
    name: 'rating'
};


/**
 * Add rating row
 * @params {number} school_id
 * @param {{
 *     score?: Array [number]
 * }} data
 * @return {Object} instance of Rating model
 */
service.add = async(function(school_id, data) {
    data.school_id = school_id;
    return await(models.Rating.create(data));
});


/**
 * Update rating data
 * @param {number} rating_id
 * @param {{
 *     score: Array [number]
 * }} data
 * @return {Object} instance of Rating model
 */
service.update = async(function(rating_id, data) {
    var instance = await(service.getOneByData({id: rating_id}));
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
 * @param {number} rating_id
 * @return {Object} instance of Rating model
 */
service.getById = async(function(rating_id) {
    return await(models.Rating.findOne({
        where: {id: rating_id}
    }));
});


/**
 * Delete rating instance
 * @param {number} rating_id
 */
service.delete = async(function(rating_id) {
    var instance = await(service.getById(rating_id));
    await(instance.destroy());
});


module.exports = service;
