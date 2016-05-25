/**
 * @fileOverview Tool for update publication date in comments
 * It parses comments from given .csv and create archive with parsed comments
 * It Can update comments dates from given early created archive
 * In this case comparisons being on stripped texts of comments to detect
 * which comment need to update
 * from .csv
 */
'use strict';


const await = require('asyncawait/await');
const CommentsParser = require('./CommentsParser');
const Archiver = require('../modelArchiver/Archiver');
const lodash = require('lodash');

const comment = require('../../../api/modules/comment');
var services = require('../../../app/components/services').all;

const FILE_PATH = './api/modules/comment/migrations/Comments.tar.gz';



class CommentPublicationDateManipulator {
    constructor() {}

    /**
     * Get comments from archived file,
     * find it in db by text,
     * update for found comments publlication dates
     * @param {string} path
     * @public
     */
    updateDates(path) {
        var comments = this.getArchivedComments_(path),
            dbComments = this.getDbComments_();

        var associatedComments = this.associateByText_(
            comments, dbComments
        );

        console.log('Total amount comments from archive: ' + comments.length);
        console.log(
            'Associated comments from csv: ' + associatedComments.length
        );

        this.updateDbComments_(associatedComments);
    }

    /**
     * Parse comments from csv and create archive
     * @param {string} filePath
     * @param {string} options
     * @public
     */
    parseCommentsFromCsv(filePath, options) {
        var csvComments = this.getCsvComments_(filePath, options);

        console.log('Total amount comments from csv: ' + csvComments.length);
        this.archive_(csvComments);
    }


    /**
     * Parse comments from given csv
     * @param {string} filePath
     * @param {string} options
     * @return {Array.<Object>}
     */
    getCsvComments_(filePath, options) {
        var commentsParser = new CommentsParser(filePath, options);
        var csvComments = await(commentsParser.getFromCsv());

        return this.filterWithText_(csvComments);
    }

    /**
     *
     * @param {string} path
     * @return {Array<{
     *     text: string,
     *     createdAt: string
     * }>}
     * @private
     */
    getArchivedComments_(path) {
        var extractedComments =  this.extract_(path);

        return extractedComments.map(comment => {
            return {
                text: this.formatText_(comment.text),
                createdAt: comment.submitDate
            };
        });
    }


    /**
     * Return comments only with text field existing
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
    getDbComments_() {
        var dbCommments = await(services.comment.list());

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
            .replace(/[ёЁ]/g, 'е')
            .replace(/[^а-яА-Я\w\d]/g,'')
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
     *     createdAt: string
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
     * @param {{
     *     id: number,
     *     createdAt: string
     * }} comment
     * @private
     */
    updateDbComment_(comment) {
        await(services.comment.update(comment.id, {
            createdAt: comment.createdAt
        }));
    }

    /**
     * Archive given comments into file
     * @param {(Array<{id: number, createdAt: Date}>)} comments
     * @private
     */
    archive_(comments) {
        var archiver = new Archiver(FILE_PATH);

        await(archiver.compress(JSON.stringify(comments)));
    }

    /**
     * Extract comments from given path
     * @param {string} path
     * @return Array<{
     *     text: string,
     *     createdAt: string
     * }>
     * @private
     */
    extract_(path) {
        var archiver = new Archiver(path);

        return JSON.parse(archiver.decompress());
    }
}

module.exports = CommentPublicationDateManipulator;
