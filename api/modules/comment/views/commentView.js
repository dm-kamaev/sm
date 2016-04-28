'use strict';
const scoreView = require('../../school/views/scoreView');

const soy = require('../../../../app/components/soy');

var commentView = {};

/**
 * Transform comments to show it on school page
 * @param {Array.<Object>=} comments
 * @return {Object}
 */
commentView.school = function(comments) {
    var typeConvert = {
        'Parent': 'Родитель',
        'Graduate': 'Выпускник',
        'Scholar': 'Ученик'
    };

    return comments
        .filter(comment => comment.text)
        .map(comment => {
            var sections = scoreView.sectionsNotEmpty(comment.rating.score);
            return {
                author: '',
                rank: typeConvert[comment.userData.userType],
                textParagraphs: {
                    crop: commentView.textParagraphs(
                        cropText(comment.text, 430)
                    ),
                    full: commentView.textParagraphs(comment.text)
                },
                sections: sections
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
