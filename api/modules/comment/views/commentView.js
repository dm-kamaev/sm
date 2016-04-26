'use strict';
const scoreView = require('../../school/views/scoreView');

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
                text: comment.text,
                sections: sections
            };
        });
};

module.exports = commentView;
