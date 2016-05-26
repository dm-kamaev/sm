'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const squel = require('squel');
const sequelize = require('../../app/components/db');
const path = require('path');

const pathToData = path.join(__dirname, '../../api/modules/comment/migrations/20160524122757-fix-text-bad-symbols.json');
const data = require(pathToData);


module.exports = {
    up: async(function () {
        data.forEach(dataItem => {
            await(updateComment(dataItem));
        });
    }),
    down: function () {
        return null;
    }
};


/**
 * Update comment with given original text
 * @param {{
 *     original: string,
 *     corrected: string
 * }} commentTexts
 */
var updateComment = async(function(commentTexts) {
    var dbComment = await(findCommentByText(commentTexts.original));

    if(dbComment) {
        await(updateCommentText(dbComment.id, commentTexts.corrected));
    }
});


/**
 * finds comment by text in db
 * @param {string} text
 * @return {{
 *     id: number,
 *     text: string
 * }|undefined}
 */
var findCommentByText = function(text) {
    var query = squel.select()
        .from('comment')
        .where('text = \'' + text + '\'')
        .limit(1)
        .toString();

    var comments =  await(sequelize.query(
        query,
        {type: sequelize.QueryTypes.SELECT}
    ));

    return comments[0];
};


/**
 * update text in comment with given id
 * @param {number} id
 * @param {string} text
 */
var updateCommentText = function(id, text) {
    var query = squel.update()
        .table('comment')
        .where('id = ' + id)
        .set('text',  text)
        .toString();

    return await(sequelize.query(
        query,
        {type: sequelize.QueryTypes.UPDATE}
    ));
};
