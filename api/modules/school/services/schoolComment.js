'use strict';

// author: dm-kamaev
// work with comment

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    socialTypes = require('../enums/socialType.js');

let service = {
    name: 'schoolComment'
};


/**
 * get All Comments with user data and rating (score)
 * @param  {[type]} schoolId)
 * @return {Object[]}
 *  [
 *      {
            "text": "Образование\nНе все едино, но очень многие.\n
                     Учителя\nУчителя очень близки с .",
            "author": "Вася",
            "socialId": "32423424",
            "socialType": "vk",
            "category": "Scholar",
            "score": 4.75,
            "updatedAt": "2016-11-21T09:50:32.184Z"
        },
 * ]
 */
service.getAllCommentsWithUser = async(function(schoolId) {
    let res = await(models.School.findOne({
        attributes: ['commentGroupId'],
        where: {
            id: schoolId
        },
        include: {
            attributes: ['id'],
            model: models.CommentGroup,
            as: 'commentGroup',
            include: {
                model: models.Comment,
                as: 'comments',
                include: [{
                    attributes: [
                        'username', 'userType', 'userId', 'updated_at'
                    ],
                    model: models.UserData,
                    as: 'userData'
                }, {
                    attributes: ['total_score'],
                    model: models.Rating,
                    as: 'rating',
                }]
            }
        },
    }));

    if (!res || !res.commentGroup) {
        return null;
    }

    let comments = res.commentGroup.comments;
    comments = comments.map(comment => {
        let userData = comment.userData || {};
        let userId = userData.userId,
            socialId, socialType;
        if (userId) {
            var user = await(services.user.getUserById(userId));
            if (user.vkId) {
                socialId = user.vkId;
                socialType = socialTypes.VKONTAKTE;
            } else if (user.facebookId) {
                socialId = user.facebookId;
                socialType = socialTypes.FACEBOOK;
            }
        }
        return {
            id: comment.id,
            text: comment.text,
            author: userData.username || '',
            socialId: socialId || '',
            socialType: socialType || '',
            userType: userData.userType || '',
            totalScore: comment.rating.dataValues['total_score'],
            updatedAt: userData['updated_at'] || '',
        };
    });

    return comments;
});


/**
 * edit text for comment
 * @param  {number} schoolId
 * @param  {string} text
 * @return {Object}
 * {
        "id": 3147,
        "created_at": "2016-12-23T09:28:43.403Z",
        "updated_at": "2016-12-23T10:37:52.552Z",
        "text": "ОБНОВИЛИ КОММЕНТАРИЙ111",
        "comment_group_id": 78,
        "rating_id": 3146,
        "user_data_id": 3149,
        "source": "User",
        "isNoticeSend": false
    }
 */
service.textEdit = async(function(schoolId, commentId, text) {
    let res = {};
    let searchComment = searchComment_(schoolId, commentId);
    if (searchComment) {
        let comment = await(models.Comment.update({
            text: text,
        }, {
            where: {
                id: searchComment.id
            },
            returning: true
        }));
        res = (comment) ? comment[1][0] : {};
    }
    return res;
});


/**
 * removeComment
 * @param  {number} schoolId
 * @param  {string} text
 * @return {number} 1 || 0
 */
service.removeComment = async(function(schoolId, commentId, text) {
    let res = 0;
    let searchComment = searchComment_(schoolId, commentId);
    if (searchComment) {
        res = await(models.Comment.destroy({
            where: {
                id: searchComment.id
            },
        }));
    }
    return res;
});


/**
 * search comment
 * @param  {number} schoolId
 * @param  {number} commentId
 * @return {Object} { id: 3147 }
 */
function searchComment_(schoolId, commentId) {
    let res = await(models.School.findOne({
        attributes: ['commentGroupId'],
        where: {
            id: schoolId
        },
        include: {
            attributes: ['id'],
            model: models.CommentGroup,
            as: 'commentGroup',
            include: {
                attributes: ['id'],
                model: models.Comment,
                as: 'comments',
                where: {
                    id: commentId
                }
            }
        },
    }));

    if (!res || !res.commentGroup) { return null; }
    return res.commentGroup.comments[0];
}

module.exports = service;
