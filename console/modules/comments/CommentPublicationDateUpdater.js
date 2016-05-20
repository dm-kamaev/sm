/**
 * @fileOverview Tool for update publication date in comments
 * It parses comments from given .csv, create comment text,
 * takes comments by text, and updates it with publication date
 * from .csv
 */
'use strict';


const await = require('asyncawait/await');
const CommentsParser = require('./CommentsParser');
const commentService = require('../../../api/modules/comment/services/comment');
const CsvConverter = require('../modelArchiver/CsvConverter');
const Archiver = require('../modelArchiver/Archiver');
const lodash = require('lodash');

const FILE_PATH = './api/modules/comment/migrations/Comments.tar.gz';



class CommentPublicationDateUpdater {
    constructor() {}

    /**
     * Get comments from csv and update it in db
     * @param {string} filePath
     * @public
     */
    updateDates(filePath, options) {
        var parsedComments = this.parseComments_(filePath, options),
            notEmptyComments = this.filterWithText_(parsedComments),
            associatedComments = await(
                this.associateCommentsWithId_(notEmptyComments)
            );
        this.archive_(associatedComments);
    }

    /**
     * Parse comments from given csv
     * @param {string} filePath
     * @param {string} options
     * @private
     */
    parseComments_(filePath, options) {
        var commentsParser = new CommentsParser(filePath, options);

        return await(commentsParser.getFromCsv());
    }


    /**
     * Return colmments only with text field existing
     * @param {Array<Object>} comments
     * @return {Array<Object>}
     * @private
     */
    filterWithText_(comments) {
        return comments.filter(comment => {
            return comment.text && comment.submitDate;
        });
    }


    /**
     * @param {Array<Object>} comments
     * @return {Array<{
     *     id: number,
     *     createdAt: Date
     * }>}
     * @private
     */
    associateCommentsWithId_(comments) {
        return comments.map(comment => {
            return this.associateCommentWithId_(comment);
        });
    }


    /**
     * Search comments in db by text from given comment and
     * return associated comment
     * @param {Object} comment
     * @return {{
     *     id: number,
     *     createdAt: Date
     * }|{}}
     * @private
     */
    associateCommentWithId_(comment) {
        var dbComment = await(commentService.getByText(comment.text)),
            result = {};
        if (dbComment) {
            result = {
                id: dbComment.id,
                createdAt: new Date(comment.submitDate).toISOString()
            };
        }
        return result;
    }


    /**
     * Update comments in db with given data
     * @param {Array<({
     *     id: number,
     *     cretedAt: Date
     * }|{})>} comments
     * @private
     */
    updateDbComments_(comments) {
        comments.forEach(comment => {
            this.updateDbComment_(comment);
        });
    }

    /**
     * Update each comment in db
     * @param {({id: number, createdAt: Date}|{})} comment
     * @private
     */
    updateDbComment_(comment) {
        if(!lodash.isEmpty(comment)) {
            commentService.update(comment.id, {
                createdAt: comment.createdAt
            });
        }
    }

    /**
     * Archive given comments into file
     * @param {({id: number, createdAt: Date}|{})} comments
     * @private
     */
    archive_(comments) {
        var converter = new CsvConverter(JSON.stringify(comments)),
            archiver = new Archiver(FILE_PATH),
            csv = await (converter.toCsv());

        await(archiver.compress(csv));
    }
}

module.exports = CommentPublicationDateUpdater;
