'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

let service = {
    name: 'rating'
};

/**
 * Add rating row
 * @param  {Array<number>} score
 * @return {Object} instance of Rating model
 */
service.create = async(function(score) {
    return await(models.Rating.create({
        score: score,
        totalScore: service.calculateTotalScore(score)
    }));
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

/**
 * Calculate total score from score parameters. If one of score parameter
 * equals 0, total score equals 0 too
 * @param  {Array<number>} score
 * @return {number}
 */
service.calculateTotalScore = function(score) {
    let notEmptyScore = score.every(parseFloat),
        result = 0;

    if (notEmptyScore) {
        let sum = score.reduce(
            (total, current) => total + parseFloat(current),
            0
        );
        result = sum / score.length;
    }

    return result;
};

module.exports = service;
