'use strict';
const scoreView = require('../../school/views/scoreView');

const soy = require('../../../../app/components/soy');

var commentView = {};

/**
 * Transform comments to show it on school page
 * @param {Array.<Object>=} comments
 * @return {Array.<{
 *     user: {
 *         type: string,
 *         name: string,
 *         details: string
 *     },
 *     date: {
 *         today: {
 *             year: number,
 *             month: number,
 *             day: number
 *         },
 *         publication: {
 *             year: number,
 *             month: number,
 *             day: number
 *         }
 *     },
 *     textParagraphs: {
 *         crop: Array.<string>,
 *         full: ?Array.<string>
 *     },
 *     score: {
 *         data: {
 *             visibleMark: Object.<string, number|string>,
 *             hiddenMarks: Array.<Object.<string, number|string>>
 *         },
 *         config: {
 *             isActive: boolean
 *         }
 *     }
 * }>}
 */
commentView.school = function(comments) {
    return comments
        .filter(comment => comment.text)
        .map(comment => {
            var score = scoreView.comment(
                comment.rating.score, comment.rating.totalScore
            );

            var userData = comment.userData || {};
            return {
                user: {
                    name: userData.username || '',
                    details: details(userData)
                },
                date: {
                    today: dateObject(new Date()),
                    publication: dateObject(comment.createdAt)
                },
                textParagraphs: {
                    crop: commentView.textParagraphs(
                        cropText(comment.text, 430)
                    ),
                    full: commentView.textParagraphs(comment.text)
                },
                score: score
            };
        });
};

/**
 * Create short text for comment.
 * Search last dot when slicing, and slices to it position.
 * @param {string} text
 * @param {number} maxLength
 * @return {string}
 */
var cropText = function(text, maxLength) {
    if (text.length > maxLength) {
        var lastDotIndex = text.substr(0, maxLength).lastIndexOf('.');

        /** Get a part from text from beginning to last dot, include dot **/
        var result = text.slice(0, lastDotIndex + 1);
    }
    return result;
};


/**
 * Transform date to date object
 * @param {string|Date} date
 * @return {{
 *     year: number,
 *     month: number,
 *     day: number
 * }}
 */
var dateObject = function(date) {
    var transformedDate = date;
    if(!date instanceof Date) {
        transformedDate = new Date(date);
    }

    return {
        year: transformedDate.getFullYear(),
        months: transformedDate.getMonth(),
        day: transformedDate.getDay()
    };
};


/**
 * @param {{
 *     userType: string,
 *     classType: ?number,
 *     yearGraduate: ?number
 * }} userData
 * @return {string}
 */
var details = function(userData) {
    var additionalInformationConverter = {
            'Parent': parentAdditionalInformation,
            'Graduate': graduateAdditionalInformation,
            'Scholar': scholarAdditionalInformation
        },
        userType = userData.userType;
    return additionalInformationConverter[userType](userData) || '';
};


/**
 * Generate additional information for parent user type
 * @param {{
 *     userType: string,
 *     classType: ?number,
 *     yearGraduate: ?number
 * }} userData
 * @return {string}
 */
var parentAdditionalInformation = function(userData) {
    var result = 'родитель',
        classType = userData.classType;
    if (classType) {
        var classTypes = {
                1: 'первоклассника',
                2: 'второклассника',
                3: 'третьеклассника',
                4: 'четвероклассника',
                5: 'пятиклассника',
                6: 'шестиклассника',
                7: 'семиклассника',
                8: 'восьмиклассника',
                9: 'девятиклассника',
                10: 'десятиклассника',
                11: 'одиннадцатиклассника'
            };
        result += ' ' + classTypes[classType];
    }
    return result;
};


/**
 * Generate additional information for scholar user type
 * @param {{
 *     userType: string,
 *     classType: ?number,
 *     yearGraduate: ?number
 * }} userData
 * @return {string}
 */
var scholarAdditionalInformation = function(userData) {
    var result = 'ученик',
        classType = userData.classType;

    if (classType) {
        result += ' (' + classType + '-й класс)';
    }
    return result;
};


/**
 * Generate additional information for graduate user type
 * @param {{
 *     userType: string,
 *     classType: ?number,
 *     yearGraduate: ?number
 * }} userData
 * @return {string}
 */
var graduateAdditionalInformation = function(userData) {
    var result = 'выпускник',
        yearGraduate = userData.yearGraduate;

    if (yearGraduate) {
        result += ' (' + yearGraduate + ')';
    }
    return result;
};


/**
 * Split comment string to paragraphs
 * @param {string} text
 * @return {Array.<string>}
 */
commentView.textParagraphs = function(text) {
    var string = text || '',
        stringChunks = string.split('\n'),
        paragraphs = [],
        paragraphTitles = [
            'образование',
            'учителя',
            'инфраструктура',
            'атмосфера',
            'индивидуализация',
            'инклюзивное образование',
            'общее впечатление'
        ];

    for (var i = 0, paragraph, length = stringChunks.length;
        i < length, paragraph = stringChunks[i];
        i++) {

        var isTitle = paragraphTitles.find(title => {
            return title == paragraph.toLowerCase();
        });

        if (isTitle) {
             paragraph += '. ' + stringChunks[i + 1];
            i++;
        }
        paragraphs.push(paragraph);
    }
    return paragraphs;
};

module.exports = commentView;
