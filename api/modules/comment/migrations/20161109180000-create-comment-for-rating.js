'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');
const squel = require('squel').useFlavour('postgres');

const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        sequelize.options.logging = false;

        let ratings = [],
            freeRatingCount = await(getFreeRatingCount());

        if (freeRatingCount == 0) {
            ratings = await(getRatingsWithNoComment());
        }

        ratings.map(rating => await(createComment(rating)));

        return ratings;
    }),
    down: function(queryInterface, Sequelize) { }
};

/**
 * @return {number}
 */
let getFreeRatingCount = async(function() {
    let query = squel.select()
        .from('rating')
        .field('count(id)')
        .where('school_id IS NULL')
        .toString();

    let result = await(sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    }));

    return result[0].count;
});

/**
 * @return {Array<Rating>}
 */
let getRatingsWithNoComment = async(function() {
    let query = squel.select({autoQuoteAliasNames: true})
        .from('rating')
        .field('rating.id', 'ratingId')
        .field('rating.school_id', 'schoolId')
        .field('rating.user_data_id', 'userDataId')
        .field('school.comment_group_id', 'commentGroupId')
        .left_join('comment', null, 'rating.id = comment.rating_id')
        .left_join('school', null, 'rating.school_id = school.id')
        .where('comment.id IS NULL')
        .toString();

    return sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
});

/**
 * @param {{
 *     schoolId: number,
 *     userDataId: number,
 *     commentGroupId: ?number
 * }} rating
 * @return {Promise<Array>}
 */
let createComment = async(function(rating) {
    rating.commentGroupId = rating.commentGroupId ||
        await(createOrFindCommentGroup(rating.schoolId));

    let createCommentQuery = getCreateCommentQuery(rating);

    return sequelize.query(
        createCommentQuery, {
            type: sequelize.QueryTypes.INSERT
        }
    );
});

/**
 * @param  {number} schoolId
 * @return {number}
 */
let createOrFindCommentGroup = async(function(schoolId) {
    let schoolCommentGroupId = await(getShoolCommentGroupId(schoolId));

    if (!schoolCommentGroupId) {
        schoolCommentGroupId = await(createShoolCommentGroupId(schoolId));
    }

    return schoolCommentGroupId;
});

/**
 * @param  {number} schoolId
 * @return {number|null}
 */
let getShoolCommentGroupId = async(function(schoolId) {
    let query = squel.select({autoQuoteAliasNames: true})
        .from('school')
        .field('comment_group_id', 'commentGroupId')
        .where(`id = ${schoolId}`)
        .toString();

    let school = await(sequelize.query(
        query, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return school[0].commentGroupId;
});

/**
 * @param  {number} schoolId
 * @return {number}
 */
let createShoolCommentGroupId = async(function(schoolId) {
    let date = new Date().toJSON(),
        createCommentGroupQuery = squel.insert()
            .into('comment_group')
            .set('created_at', date)
            .set('updated_at', date)
            .returning('id')
            .toString();

    let commentGroup = await(sequelize.query(createCommentGroupQuery, {
        type: sequelize.QueryTypes.INSERT
    }))[0];

    let schoolUpdateQuery = squel.update()
        .table('school')
        .set('comment_group_id', commentGroup.id)
        .where(`id = ${schoolId}`)
        .toString();

    await(sequelize.query(schoolUpdateQuery, {
        type: sequelize.QueryTypes.UPDATE
    }));

    return commentGroup.id;
});

/**
* @param {{
 *     userDataId: number,
 *     commentGroupId: number
 * }} data
 * @return {string}
 */
let getCreateCommentQuery = function(data) {
    let date = new Date().toJSON();
    return squel.insert()
        .into('comment')
        .set('comment_group_id', data.commentGroupId)
        .set('user_data_id', data.userDataId)
        .set('rating_id', data.ratingId)
        .set('is_notice_send', true)
        .set('created_at', date)
        .set('updated_at', date)
        .toString();
};
