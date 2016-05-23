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
        var csvComments = this.getFormattedCsvComments_(filePath, options),
            dbComments = this.getFormattedDbComments_();
        
        var associatedComments = this.associateByText_(
            csvComments, dbComments
        );
        
        console.log('Total amount comments from csv: ' + csvComments.length);
        console.log(
            'Associated comments from csv: ' + associatedComments.length
        );

        this.archive_(associatedComments);
    }

    /**
     * Parse comments from given csv
     * @param {string} filePath
     * @param {string} options
     * @private
     */
    getFormattedCsvComments_(filePath, options) {
        var commentsParser = new CommentsParser(filePath, options);

        var csvComments = await(commentsParser.getFromCsv()),
            notEmptyCsvComments = this.filterWithText_(csvComments);

        return notEmptyCsvComments.map(comment => {
            return {
                text: this.formatText_(comment.text),
                createdAt: comment.submitDate
            };
        });
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
     * Return all comments from db
     * @return {Array<{
     *     id: number,
     *     text: string
     * }>}
     * @private
     */
    getFormattedDbComments_() {
        var dbCommments = await(commentService.list());

        return dbCommments.map(comment => {
            return {
                id: comment.id,
                text: this.formatText_(comment.text)
            };
        });
    }


    /**
     * Delete from text newline symbols and all non-text symbols
     * @param {string} text
     * @return {string}
     * @private
     */
    formatText_(text) {
        return text
            .replace(/[^a-zA-Zа-яА-ЯёЁ1-9]/g,'')
            .replace(/[ёЁ]/g, 'е')
            .toLowerCase();
    }


    /**
     * Associate comments from csv and db by text
     * @param {Array<{
     *     text: string,
     *     createdAt: Date
     * }>} csvComments
     * @param {Array<{
     *     id: number,
     *     text: string
     * }>} dbComments
     * @return {Array<{
     *     id: number,
     *     createdAt: Date
     * }>}
     * @private
     */
    associateByText_(csvComments, dbComments) {
        var associatedComments = csvComments.map(csvComment => {
            var result = {},
                dbComment = dbComments.find(dbComment => {
                    return dbComment.text == csvComment.text;
                });

            if (dbComment) {
                result = {
                    id: dbComment.id,
                    createdAt: new Date(csvComment.createdAt)
                };
            }
            
            return result;
        });

        var  notEmptyComments = associatedComments.filter(comment => {
            return !lodash.isEmpty(comment);
        });

        return notEmptyComments;
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
