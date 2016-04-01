'use strict';
var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var readlineSync = require('readline-sync');
var Converter = require('csvtojson').Converter;

var services = require.main.require('./app/components/services').all;
var SchoolSearcher = require('./modules/parse/SchoolSearcher.js');
var SqlHelper = require('./modules/sqlHelper/SqlHelper.js');
var models = require.main.require('./app/components/models').all;
var sequelize = require('../app/components/db');

var originHeaders = require('./modules/comments/originalConfig.json').headers;
var extHeaders = require('./modules/comments/extendedConfig.json').headers;
var userTypeEnum = require('../api/modules/user/enums/userType');

class Comments {

    /**
     * @public
     * @param {string} filePath
     */
    constructor(filePath) {
        this.PATH = filePath;

        var schools = await(services.school.listInstances());

        this.schoolSearcher_ = new SchoolSearcher(schools);
    }

    /**
     * Main method
     * @public
     */
    parse() {
        var comments = await(this.readCsv_(this.PATH)),
            commentsBySchool = this.groupCommentsBySchool_(comments),

            schoolsCommentsToAdd = this.schoolSearcher_.find(commentsBySchool),
            notFoundSchools = this.schoolSearcher_.getNotFoundSchools();

        if (readlineSync.keyInYN('Do you want to delete current comments?')) {
            this.resetData_();
        }

        await(this.fillDb_(schoolsCommentsToAdd));
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
     * @param {object} schoolsComments
     */
    fillDb_(schoolsComments) {
        schoolsComments.forEach(school => {
            var schoolId = school.id,
                comments = school.data;
            comments.forEach(comment => {
                await(services.school.review(schoolId, comment));
            });
        });
    }

    /**
     * Clear comment, comment_group tables and resets school's comments/scores
     * @private
     */
    resetData_() {
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
        return filePath.indexOf('_new') > -1 ? extHeaders : originHeaders;
    }
}

var startScript = async(function(filePath) {
    var comments = new Comments(filePath);
    await(comments.parse());
});

commander
    .command('comments <path>')
    .description('Adds comments from given *.csv.' +
        ' File name should contain _new/_old suffix depends on file structure')
    .action(filePath => startScript(filePath));

exports.Command;
