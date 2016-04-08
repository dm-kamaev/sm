'use strict';

var await = require('asyncawait/await');
var fs = require('fs');
var Archiver = require('../modelArchiver/Archiver');

var SqlHelper = require('../sqlHelper/SqlHelper.js');
var models = require('../../../app/components/models').all;
var sequelize = require('../../../app/components/db');
var services = require('../../../app/components/services').all;

const FILE_PATH = './api/modules/comment/migrations/Comments.tar.gz';

module.exports = class PollComments {

    constructor() { }


    /**
     * Clear comment, comment_group tables and resets school's comments/scores
     * @public
     */
    resetData() {
        var resetColumns = 'UPDATE school \
            SET score=NULL, \
            comment_group_id=NULL, \
            total_score=0, \
            score_count=NULL, \
            review_count=NULL \
            WHERE comment_group_id <> 0;';
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
                await(services.school.review(schoolId, comment));
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
}
