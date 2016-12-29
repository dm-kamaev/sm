'use strict';

// author: dm-kamaev
// work with comment

// const async = require('asyncawait/async'),
//     await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;
//     services = require('../../../../app/components/services').all,
const userServices = require('../../user/services/user.js');
const socialTypes = require('../enums/socialType.js');

let service: any = {
    name: 'schoolComment'
};

interface IgetCommentWithUser {
    text: string,
    author: string,
    socialId: string,
    socialType: string,
    category: string,
    score: number,
    updatedAt: string
}
/**
 * get comment with user data and rating (score)
 * @param  {Number} schoolId
 * @param  {Number} commentId
 * @return {Object[]}
 * {
        "text": "Образование\nНе все едино, но очень многие.\n
                Учителя\nУчителя очень близки с .",
        "author": "Вася",
        "socialId": "32423424",
        "socialType": "vk",
        "category": "Scholar",
        "score": 4.75,
        "updatedAt": "2016-11-21T09:50:32.184Z"
    }
 */
service.getCommentWithUser =
    async function(schoolId:number, commentId: number):Promise<IgetCommentWithUser> | null {
    let res = await models.School.findOne({
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
                where: {
                    id: commentId
                },
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
    });

    if (!res || !res.commentGroup) {
        return null;
    }

    let comment = res.commentGroup.comments[0];
    return await buildCommentWithUserData_([comment])[0];
};

/**
 * get All Comments with user data and rating (score)
 * @param  {Number} schoolId
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
service.getAllCommentsWithUser =
    async function(schoolId:number):Promise<IgetCommentWithUser[]> | null  {
    let res = await models.School.findOne({
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
    });

    if (!res || !res.commentGroup) {
        return null;
    }

    let comments = res.commentGroup.comments;
    return await buildCommentWithUserData_(comments);
};


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
service.textEdit= async function(schoolId:number, commentId:number, text:string):Promise<any> {
    let res = {};
    let searchComment: any = searchComment_(schoolId, commentId);
    if (searchComment) {
        let comment = await models.Comment.update({
            text: text,
        }, {
            where: {
                id: searchComment.id
            },
            returning: true
        });
        res = (comment) ? comment[1][0] : {};
    }
    return res;
};


/**
 * removeComment
 * @param  {number} schoolId
 * @return {number} 1 || 0
 */
// service.removeComment = async(function(schoolId, commentId) {
//     let res = 0;
//     let searchComment = searchComment_(schoolId, commentId);
//     if (searchComment) {
//         res = await(models.Comment.destroy({
//             where: {
//                 id: searchComment.id
//             },
//         }));
//     }
//     return res;
// });


/**
 * search comment
 * @param  {number} schoolId
 * @param  {number} commentId
 * @return {Object} { id: 3147 }
 */
async function searchComment_(schoolId:number, commentId:number):Promise<any> {
    let res = await models.School.findOne({
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
    });

    if (!res || !res.commentGroup) { return null; }
    return res.commentGroup.comments[0];
}


/**
 * buildCommentWithUserData_
 * @param  {Object[]} comments [{}]
 * @return {Object[]}
 * [{
 *     id,
       text,
       author,
       socialId,
       socialType,
       userType,
       totalScore,
       updatedAt,
 *  },]
 */
function buildCommentWithUserData_(comments):Promise<IgetCommentWithUser[]> {
    return comments.map(comment => {
        let userData = comment.userData || {};
        let userId = userData.userId,
            socialId, socialType;
        if (userId) {
            let user = await userServices.getUserById(userId);
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
}

export default service;
