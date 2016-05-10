'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const squel = require('squel');
const sequelize = require('../../app/components/db');

module.exports  = {
    up: async(function() {
        return await (updateTotalScore());
    }),
    down: {}
};

/**
 * Calculate average score from score array and write in
 * total_score field for all ratings
 */
var updateTotalScore = async(function() {
    var ratingQuery = squel.select()
        .from('rating')
        .field('id')
        .field('score')
        .toString();
    var ratings = await(sequelize.query(
        ratingQuery,
        {type: sequelize.QueryTypes.SELECT}
    ));

    for(var i = 0, rating, l = ratings.length;
        rating = ratings[i], i < l;
        i++) {
        var totalScore = calculateAverageScore(rating.score);
        await(setTotalScore(rating.id, totalScore));
    }
});

/**
 * Calculates average score from score array
 * @param {Array.<number>} opt_score
 */
var calculateAverageScore = function(opt_score) {
    var score = opt_score || [0,0,0,0],
        notEmptyScore = score.every(scoreItem => scoreItem),
        result = 0;
    if (notEmptyScore) {
        var sum = score.reduce((sum, currentScore) => {
            return sum + currentScore;
        });
        result = sum / score.length;
    }
    return result;
};

/**
 * Set total score for rating with given id
 * @param {number} ratingId
 * @param {number} totalScore
 */
var setTotalScore = async(function(ratingId, totalScore) {
    var updateRatingQuery = squel.update()
        .table('rating')
        .set('total_score', totalScore)
        .where('id = ' + ratingId)
        .toString();

    await(sequelize.query(
        updateRatingQuery,
        {type: sequelize.QueryTypes.UPDATE}
    ));
});
