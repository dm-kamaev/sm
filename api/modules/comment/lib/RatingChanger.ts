'use strict';

const squel = require('squel').useFlavour('postgres');

const sequelize = require('../../../../app/components/db');

import {service as ratingService} from '../services/rating';

const SCORE_COUNT = 4; // number of score positions
const MIN_SCORE_COUNT = 3; // minimum number of each score
const MIN_REVIEW_COUNT = 5; // minimum number of reviews
const DEFAULT_COMMENT_TABLE = 'comment';

export class RatingChanger {
    private tableName: string;
    private commentGroupId: number;
    private commentTableName: string;

    /**
     * @constructor
     * @param {string} tableName
     * @param {number} commentGroupId
     */
    constructor(
            tableName: string,
            commentGroupId: number,
            commentTableName?: string
    ) {
        /**
         * @private
         * @type {string}
         */
        this.tableName = tableName;

        /**
         * @private
         * @type {number}
         */
        this.commentGroupId = commentGroupId;

        this.commentTableName = commentTableName || DEFAULT_COMMENT_TABLE;
    }

    /**
     * Update rating in entity table
     */
    public async update() {
        const totalRating = await this.getTotalRating_();

        totalRating.score = totalRating.score.map((grade, i) =>
            totalRating.scoreCount[i] >= MIN_SCORE_COUNT ?
                parseFloat(grade) :
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

        return this.updateTable_(totalRating);
    }

    /**
     * @private
     * @return {{
     *     reviewCount: number,
     *     score: Array<number>,
     *     scoreCount: Array<number>
     * }}
     */
    private async getTotalRating_() {
        const totalRatingQuery = squel
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
                this.commentTableName,
                null,
                `comment_group.id = ${this.commentTableName}.comment_group_id`
            )
            .left_join(
                'rating',
                null,
                `${this.commentTableName}.rating_id = rating.id AND ` +
                    'rating.id is not null'
            )
            .where(`comment_group.id = ${this.commentGroupId}`)
            .group('comment_group.id')
            .toString();

        const result = await sequelize.query(
            totalRatingQuery, {
                type: sequelize.QueryTypes.SELECT
            }
        );

        return result[0];
    }

    /**
     * @private
     * @param  {string} aggregateFunctionName
     * @return {string}
     */
    private aggregateScores_(aggregateFunctionName) {
        const scoreAggregations = [];
        for (let i = 1; i <= SCORE_COUNT; i++) {
            scoreAggregations.push(
                `${aggregateFunctionName}(rating.score[${i}]) ` +
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
    private getFilterCondition_(scorePosition) {
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
    private async updateTable_(rating) {
        const updateQuery = squel.update()
            .table(this.tableName)
            .set('review_count', rating.reviewCount)
            .set('score', `{${rating.score.join(', ')}}`)
            .set('score_count', `{${rating.scoreCount.join(', ')}}`)
            .set('total_score', rating.totalScore)
            .where(`comment_group_id = ${this.commentGroupId}`)
            .toString();

        return await sequelize.query(
            updateQuery, {
                type: sequelize.QueryTypes.UPDATE
            }
        );
    }
};
