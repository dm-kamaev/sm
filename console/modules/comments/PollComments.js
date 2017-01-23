'use strict';

var await = require('asyncawait/await');
var squel = require('squel').useFlavour('postgres');
var Archiver = require('../modelArchiver/Archiver');

var SqlHelper = require('../sqlHelper/SqlHelper.js');
var models = require('../../../app/components/models').all;
var sequelize = require('../../../app/components/db');

const FILE_PATH = './api/modules/comment/migrations/Comments.tar.gz';

module.exports = class PollComments {
    /**
     * @constructor
     */
    constructor() {
        var date = new Date(),
            formattedDate = date.toJSON();
        /**
         * @type {string}
         */
        this.formattedDate_ = formattedDate;
    }


    /**
     * Clear comment, comment_group tables and resets school's comments/scores
     * @public
     */
    resetData() {
        var resetColumns = `UPDATE school
            SET score=NULL,
            comment_group_id=NULL,
            total_score=0,
            score_count=NULL,
            review_count=NULL
            WHERE comment_group_id <> 0;`;
        await(SqlHelper.resetTable(models.Comment.tableName));
        await(SqlHelper.resetTable(models.Rating.tableName));
        await(sequelize.query(
            resetColumns,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
        await(SqlHelper.resetTable(models.CommentGroup.tableName));
        await(SqlHelper.resetTable(models.UserData.tableName));
    }



    /**
     * @public
     * @param {object} schoolsComments
     */
    fillDb(schoolsComments) {
        schoolsComments.forEach(school => {
            var schoolId = school.id,
                comments = school.data;
            comments.forEach(comment => {
                await(this.addReview(schoolId, comment));
            });
        });
    }

    /**
     * @public
     * @param {object} schoolsComments
     */
    archiveComments(schoolsComments) {
        var archiver = new Archiver(FILE_PATH);
        archiver.compress(schoolsComments);
    }

    /**
     * @public
     * @param {string} path
     * @return {object}
     */
    unzipComments(path) {
        var archiver = new Archiver(path);
        return JSON.parse(archiver.decompress());
    }

    /**
     * @param {number} schoolId
     * @param {Object} comment
     * @return {Object}
     */
    addReview(schoolId, comment) {
        if (!comment.text && !comment.score) {
            throw new Error('Expected comment text or rating');
        }
        try {
            var answer = {
                ratingCreated: false,
                commentCreated: false
            };
            var school = await(this.getSchool_(schoolId));

            var userData = {
                userType: comment.userType || null,
                yearGraduate: comment.yearGraduate || null,
                classType: comment.classType || null,
                key: comment.key || null,
                username: comment.username || null,
                userId: comment.userId || null
            };

            var userDataInstance = await(this.createUserData_(userData));

            comment.userDataId = userDataInstance.id;


            if (comment.score) {
                comment.rating = await(this.createRating_(school.id, comment));
                answer.ratingCreated = true;
            }

            if (comment.text) {
                var commentGroupId = await(this.getGroupId_(school));
                await(this.createComment_(commentGroupId, comment));
                answer.commentCreated = true;
            }
            return answer;
        } catch (e) {
            throw e;
        }
    }

    /**
     * @private
     * @param {number} schoolId
     * @return {Object}
     */
    getSchool_(schoolId) {
        var findSchoolQuery = squel.select()
            .from('school')
            .where('id = ' + schoolId)
            .limit(1)
            .toString();
        return await(sequelize.query(findSchoolQuery, {
            type: sequelize.QueryTypes.SELECT
        }))[0];
    }

    /**
     * @private
     * @param {Object} data
     * @return {Object}
     */
    createUserData_(data) {
        var insertUserDataQuery = squel.insert()
            .into('user_data')
            .set('user_type', data.userType)
            .set('year_graduate', data.yearGraduate)
            .set('class_type', data.classType)
            .set('key', data.key)
            .set('username', data.username)
            .set('user_id', data.userId)
            .set('created_at', this.formattedDate_)
            .set('updated_at', this.formattedDate_)
            .returning('*')
            .toString();
        return await(sequelize.query(insertUserDataQuery, {
            type: sequelize.QueryTypes.INSERT
        }))[0];
    }

    /**
     * @private
     * @param {Object} schoolId
     * @param {Object} data
     * @return {Object}
     */
    createRating_(schoolId, data) {
        var totalScore = this.calculateTotalScore_(data.score);
        var insertRatingQuery = squel.insert()
            .into('rating')
            .set('score', this.arrayToPgArray_(data.score))
            .set('total_score', totalScore)
            .set('school_id', schoolId)
            .set('user_data_id', data.userDataId)
            .set('created_at', this.formattedDate_)
            .set('updated_at', this.formattedDate_)
            .returning('*')
            .toString();
        return await(sequelize.query(insertRatingQuery, {
            type: sequelize.QueryTypes.INSERT
        }))[0];
    }

    /**
     * @private
     * @param {Object} school
     * @return {number}
     */
    getGroupId_(school) {
        var groupId;
        if (!school['comment_group_id']) {
            var commentGroup = this.createCommentGroup_();
            groupId = commentGroup.id;

            this.updateSchoolCommentGroup_(school.id, groupId);
        } else {
            groupId = school['comment_group_id'];
        }
        return groupId;
    }

    /**
     * @private
     * @return {Object}
     */
    createCommentGroup_() {
        var createCommentGroupQuery = squel.insert()
            .into('comment_group')
            .set('created_at', this.formattedDate_)
            .set('updated_at', this.formattedDate_)
            .returning('*')
            .toString();
        return await(sequelize.query(createCommentGroupQuery, {
            type: sequelize.QueryTypes.INSERT
        }))[0];
    }

    /**
     * @private
     * @param {number} schoolId
     * @param {number} groupId
     */
    updateSchoolCommentGroup_(schoolId, groupId) {
        var updateSchoolGroupQuery = squel.update()
            .table('school')
            .set('comment_group_id', groupId)
            .where('id = ' + schoolId)
            .toString();
        await(sequelize.query(updateSchoolGroupQuery, {
            type: sequelize.QueryTypes.UPDATE
        }));
    }

    /**
     * @private
     * @param {Array<number>} score
     * @return {number}
     */
    calculateTotalScore_(score) {
        var notEmptyScore = score.every(scoreItem => {
                return parseFloat(scoreItem);
            }),
            result = 0;
        if (notEmptyScore) {
            var sum = 0;
            score.forEach(currentScore => {
                sum += parseFloat(currentScore);
            });
            result = sum / score.length;
        }
        return result;
    };

    /**
     * @private
     * @param {Array} array
     * @return {string}
     */
    arrayToPgArray_(array) {
        return '{' + array.toString() + '}';
    }

    /**
     * @private
     * @param {number} commentGroupId
     * @param {Object} data
     */
    createComment_(commentGroupId, data) {
        var createCommentQuery = squel.insert()
            .into('comment')
            .set('comment_group_id', commentGroupId)
            .set('text', data.text)
            .set('user_data_id', data.userDataId)
            .set('is_notice_send', false)
            .set('rating_id', data.rating.id || null)
            .set('created_at', this.formattedDate_)
            .set('updated_at', this.formattedDate_)
            .toString();
        await(sequelize.query(createCommentQuery, {
            type: sequelize.QueryTypes.INSERT
        }));
    }
};
