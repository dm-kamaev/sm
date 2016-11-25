'use strict';

const await = require('asyncawait/await');
const squel = require('squel').useFlavour('postgres');

const sequelize = require('../../../../app/components/db'),
    ratingService = require('../services/rating');

const SCORE_COUNT = 4, // number of score positions
    MIN_SCORE_COUNT = 3, // minimum number of each score
    MIN_REVIEW_COUNT = 5; // minimum number of reviews

module.exports = class RatingChanger {
    /**
     * @constructor
     * @param {string} tableName
     * @param {number} commentGroupId
     */
    constructor(tableName, commentGroupId) {
        /**
         * @private
         * @type {string}
         */
        this.tableName_ = tableName;

        /**
         * @private
         * @type {number}
         */
        this.commentGroupId_ = commentGroupId;
    }

    /**
     * Update rating in entity table
     */
    update() {
        let totalRating = this.getTotalRating_();

        totalRating.score = totalRating.score.map((grade, i) =>
            totalRating.scoreCount[i] >= MIN_SCORE_COUNT ?
                grade :
                0
        );

        if (totalRating.score.every(grade => grade) &&
                totalRating.reviewCount >= MIN_REVIEW_COUNT
            ) {
            totalRating.totalScore = ratingService.calculateTotalScore(
                totalRating.score
            );
        } else {
            totalRating.totalScore = 0;
        }

        this.updateTable_(totalRating);
    }

    /**
     * @private
     * @return {{
     *     reviewCount: number,
     *     score: Array<number>,
     *     scoreCount: Array<number>
     * }}
     */
    getTotalRating_() {
        let totalRatingQuery = squel
            .select({autoQuoteAliasNames: true})
            .from('comment_group')
            .field(
                'count(rating.id) FILTER (WHERE ' +
                    'cardinality(array_remove(rating.score, 0)) > 0)',
                'reviewCount'
            )
            .field(this.aggregateScores_('avg'), 'score')
            .field(this.aggregateScores_('count'), 'scoreCount')
            .left_join(
                'comment',
                null,
                'comment_group.id = comment.comment_group_id'
            )
            .left_join(
                'rating',
                null,
                'comment.rating_id = rating.id AND rating.id is not null'
            )
            .where(`comment_group.id = ${this.commentGroupId_}`)
            .group('comment_group.id')
            .toString();

        let result = await(sequelize.query(
            totalRatingQuery, {
                type: sequelize.QueryTypes.SELECT
            }
        ));

        return result[0];
    }

    /**
     * @private
     * @param  {string} aggregateFunction
     * @return {string}
     */
    aggregateScores_(aggregateFunction) {
        let scoreAggregations = [];
        for (let i = 1; i <= SCORE_COUNT; i++) {
            scoreAggregations.push(
                `${aggregateFunction}(rating.score[${i}]) ` +
                    this.getFilterCondition_(i)
            );
        }
        return `ARRAY[${scoreAggregations.join(', ')}]`;
    }

    /**
     * @private
     * @param  {number} scorePosition
     * @return {string}
     */
    getFilterCondition_(scorePosition) {
        return `FILTER (WHERE rating.score[${scorePosition}] > 0)`;
    }

    /**
     * @private
     * @param {{
     *     reviewCount: number,
     *     score: Array<number>,
     *     scoreCount: Array<number>,
     *     totalScore: number
     * }} rating
     */
    updateTable_(rating) {
        let updateQuery = squel.update()
            .table(this.tableName_)
            .set('review_count', rating.reviewCount)
            .set('score', `{${rating.score.join(', ')}}`)
            .set('score_count', `{${rating.scoreCount.join(', ')}}`)
            .set('total_score', rating.totalScore)
            .where(`comment_group_id = ${this.commentGroupId_}`)
            .toString();

        await(sequelize.query(
            updateQuery, {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }
};
