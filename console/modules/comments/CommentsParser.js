'use strict';

var await = require('asyncawait/await');
var readlineSync = require('readline-sync');
var Converter = require('csvtojson').Converter;

var services = require('../../../app/components/services').all;
var SchoolSearcher = require('../parse/SchoolSearcher');
var PollComments = require('./PollComments');

var originHeaders = require('./originalConfig.json').headers;
var extHeaders = require('./extendedConfig.json').headers;
var userTypeEnum = require('../../../api/modules/user/enums/userType');

module.exports = class CommentsParser {

    /**
     * @public
     * @param {string} filePath
     * @param {Object} options
     */
    constructor(filePath, options) {
        this.path_ = filePath;

        this.options_ = options || {};

        var schools = await(services.school.listInstances());

        this.schoolSearcher_ = new SchoolSearcher(schools);
    }

    /**
     * Main method
     * @public
     */
    parse() {
        var comments = await(this.readCsv_(this.path_)),
            commentsBySchool = this.groupCommentsBySchool_(comments),

            schoolsCommentsToAdd = this.schoolSearcher_.find(commentsBySchool);

        var pollComments = new PollComments();

        if (readlineSync.keyInYN('Do you want to delete current comments?')) {
            pollComments.resetData();
        }

        await(pollComments.fillDb(schoolsCommentsToAdd));
        if (this.options_.archive) {
            pollComments.archiveComments(schoolsCommentsToAdd);
        }
    }

    /**
     * Parse comments and return it
     * @return {Array<Object>} - parsed from csv comments
     * @public
     */
    getFromCsv() {
        var comments = await(this.readCsv_(this.path_));

        return comments.map(comment => {
            return this.parseComment_(comment);
        });
    }

    /**
     * @private
     * @param {array<object>} data
     * @return {array<object>}
     */
    groupCommentsBySchool_(data) {
        var sortBySchool = {},
            result = [];
        data.forEach(comment => {
            var schoolName = comment.school === 'Другая' ?
                comment.altSchool : comment.school;
            comment = this.parseComment_(comment);
            if (!comment.userType) {
                return;
            }
            if (sortBySchool.hasOwnProperty(schoolName)) {
                sortBySchool[schoolName].push(comment);
            } else {
                sortBySchool[schoolName] = [comment];
            }
        });

        for (var school in sortBySchool) {
            result.push({
                name: school,
                data: sortBySchool[school]
            });
        }
        return result;
    }



    /**
     * @private
     * @param {object} comment
     * @returns {object}
     */
    parseComment_(comment) {
        var parsedComment = {};
        parsedComment.userType = this.getUserType_(comment.type);
        parsedComment.key = comment.hash;

        if (comment.permission !== 0) {
            parsedComment.username = comment.name;

            parsedComment.yearGraduate = comment.year;

            var text = comment.eduComment && 'Образование\n' +
                comment.eduComment + '\n' || '';
            text += comment.teacherComment && 'Учителя\n' +
                comment.teacherComment + '\n';
            text += comment.infrastrComment && 'Инфраструктура\n' +
                comment.infrastrComment + '\n';
            text += comment.atmComment && 'Атмосфера\n' +
                comment.atmComment + '\n';
            text += comment.individComment && 'Индивидуализация\n' +
                comment.individComment + '\n';
            text += comment.inclusiveComment && 'Инклюзивное образование\n' +
                comment.inclusiveComment + '\n';
            text += comment.overallComment && 'Общее впечатление\n' +
                comment.overallComment + '\n';

            if (text) {
                text = text.slice(0, -1);
            }

            parsedComment.text = text;
            parsedComment.classType = comment.kidGrade || comment.pupilGrade;
        }

        var edu = comment.education || 0,
            teach = comment.teacher || 0,
            atm = comment.atmosphere || 0,
            infrastr = comment.infrastructure || 0;
        parsedComment.score = [edu, teach, atm, infrastr];

        parsedComment.submitDate = comment.submitDate;

        return parsedComment;
    }

    /**
     * @pivate
     * @param {string} userType
     * @returns {string}
     */
    getUserType_(userType) {
        var result;
        switch (userType) {
        case 'Окончил(а) школу менее 3 лет назад':
            result = userTypeEnum.GRADUATE;
            break;
        case 'Окончил(а) школу 3 или более лет назад':
            result = userTypeEnum.GRADUATE;
            break;
        case 'Сейчас учусь в школе':
            result = userTypeEnum.SCHOLAR;
            break;
        case 'Мои дети ходят в школу':
            result = userTypeEnum.PARENT;
            break;
        case 'Выпускник':
            result = userTypeEnum.GRADUATE;
            break;
        case 'Ученик':
            result = userTypeEnum.SCHOLAR;
            break;
        case 'Родитель':
            result = userTypeEnum.PARENT;
            break;
        default:
            result = '';
        }
        return result;
    }

    /**
     * Read csv from file and returns json
     * @private
     * @param {string} filePath
     * @return {promise<array<object>>}
     */
    readCsv_(filePath) {
        var headers = this.getFileHeader_(filePath);
        return new Promise((resolve, reject) => {
            var converter = new Converter({headers: headers});
            converter.fromFile(filePath, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * Define headers
     * @private
     * @param {string} filePath
     * @return {object}
     */
    getFileHeader_(filePath) {
        return this.options_.file_type === 'new' ? extHeaders : originHeaders;
    }
};
