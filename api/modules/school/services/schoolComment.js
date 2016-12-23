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
    var res = await(models.School.findOne({
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
            text: comment.text,
            author: userData.username || '',
            socialId: socialId || '',
            socialType: socialType || '',
            userType: userData.userType || '',
            totalScore: comment.rating.dataValues['total_score'],
            updatedAt: userData['updated_at'] || '',
        };
    });
    // console.log('+++++++++++++++++++++++++++++++');
    // console.log(comments);
    // console.log('length=', comments.length);
    // console.log('+++++++++++++++++++++++++++++++');
    return comments;
});

module.exports = service;
