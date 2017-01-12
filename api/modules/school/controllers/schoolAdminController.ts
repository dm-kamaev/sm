'use strict';

// author: dm-kamaev
// admin for school

const util = require('util');
import schoolCommentService from '../services/schoolComment';
import commentView from '../views/commentView';
import schoolAdminService from '../services/schoolAdminService';
import SchoolNotExistTypeError from './errors/SchoolNotExistTypeError';
import SchoolLinkNotExistError from './errors/SchoolLinkNotExistError';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

/**
 * create school
 * @api {post} /api/school
 * @apiVersion 0.1.0
 * @apiName createSchool
 * @apiGroup School
 *
 * @apiSuccess {Object}   school
 * @apiSuccess {String}   school.name           school name
 * @apiSuccess {String}   courses.abbreviation  reduction school name
 * @apiSuccess {String}   courses.fullName      full name school name
 * @apiSuccess {String}   courses.schoolType    type
 * @apiSuccess {String}   courses.director      fullname director
 * @apiSuccess {Object[]} courses.phones        list phones
 * @apiSuccess {Number}   courses.govermentKey  key for school in goverment
 * @apiSuccess {Object[]} courses.features      list features
 * @apiSuccess {Boolean}  courses.dressCode     exist dressCode
 * @apiSuccess {Object[][]} courses.links    site/facebook/vk
 *     @apiSuccess {String} courses.links[0] name "Гимназия на сайте Департамента образования Москвы"
 *     @apiSuccess {String} courses.links[1] link "vk.com/club86036747"

 * @apiSuccessExample {json} Example response:
 {
   "name": "Школа №14",
   "abbreviation": "ГБОУ СОШ № 14",
   "fullName": "Государственное
                бюджетное образовательное учреждение города Москвы
                средняя общеобразовательная школа № 14",
   "schoolType": "Школа",
   "director": "Любимов Олег Вадимович",
   "phones": ["(495) 223-32-23", "(499)322-23-33"],
   "govermentKey": 100,
   "totalScore": 4,
   "features": [
           "В лицее нет традиционных классов: ученики делятся на группы в
            зависимости от выбранного ими учебного плана",
           "В расписании предусмотрены факультетские дни, которые лицеисты
            проводят на
            профильных факультетах НИУ ВШЭ*"
    ],
    "dressCode": true,
    "extendedDayCost": "3000 руб./мес.",
    links: [
        [
            "Гимназия на сайте Департамента образования Москвы",
            "1811.mskobr.ru"
        ],
        [
            " Сообщество гимназии Вконтакте",
            "vk.com/club86036747"
        ],
    ]

 }
 *
 */
exports.create = async function(req, res) {
    let result, schoolData = req.body;

    try {
        result = await schoolAdminService.create(schoolData);
    } catch (error) {
        if (error instanceof SchoolNotExistTypeError) {
            result = error.response;
            logger.error(JSON.stringify(error));
        } else {
            result = error;
            logger.error(util.inspect(error, { depth:4 }));
        }
    }
    res.json(result);
};


/**
 * update school
 * @api {put} /api/school/:schoolId
 * @apiVersion 0.1.0
 * @apiName updateSchool
 * @apiGroup School
 *
 * @apiSuccess {Object}   school
 * @apiSuccess {String}   school.name           school name
 * @apiSuccess {String}   school.abbreviation  reduction school name
 * @apiSuccess {String}   school.fullName      full name school name
 * @apiSuccess {String}   school.schoolType    type
 * @apiSuccess {String}   school.director      fullname director
 * @apiSuccess {Object[]} school.phones        list phones
 * @apiSuccess {Number}   school.govermentKey  key for school in goverment
 * @apiSuccess {Object[]} school.features      list features
 * @apiSuccess {Boolean}  school.dressCode     exist dressCode
 * @apiSuccess {Object[][]} school.links       site/facebook/vk
 *     @apiSuccess {String} school.links[0]    name "Гимназия на сайте Департамента образования Москвы"
 *     @apiSuccess {String} school.links[1]    link "vk.com/club86036747"

 * @apiSuccessExample {json} Example response:
 {
   "name": "Школа №14",
   "abbreviation": "ГБОУ СОШ № 14",
   "fullName": "Государственное
                бюджетное образовательное учреждение города Москвы
                средняя общеобразовательная школа № 14",
   "schoolType": "Школа",
   "director": "Любимов Олег Вадимович",
   "phones": ["(495) 223-32-23", "(499)322-23-33"],
   "govermentKey": 100,
   "totalScore": 4,
   "features": [
           "В лицее нет традиционных классов: ученики делятся на группы в
            зависимости от выбранного ими учебного плана",
           "В расписании предусмотрены факультетские дни, которые лицеисты
            проводят на
            профильных факультетах НИУ ВШЭ*"
    ],
    "dressCode": true,
    "extendedDayCost": "3000 руб./мес.",
    links: [
        [
            "Гимназия на сайте Департамента образования Москвы",
            "1811.mskobr.ru"
        ],
        [
            " Сообщество гимназии Вконтакте",
            "vk.com/club86036747"
        ],
    ]

 }
 *
 */
exports.update = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        schoolData = req.body;

    try {
        result = await schoolAdminService.update(schoolId, schoolData);
    } catch (error) {
        if (error instanceof SchoolNotExistTypeError) {
            result = error.response;
            logger.error(JSON.stringify(error));
        } else {
            result = error;
            logger.error(util.inspect(error, { depth:4 }));
        }
    }
    res.json(result);
};


/**
 * update link for school
 * @api {put} /school/:schoolId/link/:linkId
 * @apiVersion 0.1.0
 * @apiName updateSchoolLink
 * @apiGroup School
 *
 * @apiSuccess {Object}   link
 * @apiSuccess {String}   link.name link name
 * @apiSuccess {String}   link.url  url
 * @apiSuccessExample {json} Example response:
 {
    "name": "Гимназия на сайте Департамента образования Москвы",
    "url": "1811.mskobr.ru"
 }
 *
 */
exports.updateLink = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        linkId: number = parseInt(req.params.linkId, 10),
        linkData = req.body;

    try {
        if (linkId === 0) { throw new SchoolLinkNotExistError(); }
        result = await schoolAdminService.updateLink(
            schoolId, linkId, linkData
        );
    } catch (error) {
        if (error instanceof SchoolLinkNotExistError) {
            result = error.response;
            logger.error(JSON.stringify(error));
        } else {
            result = error;
            logger.error(util.inspect(error, { depth:4 }));
        }
    }
    res.json(result);
};


/**
 * update school
 * @api {delete} /api/school/:schoolId
 * @apiVersion 0.1.0
 * @apiName updateSchool
 * @apiGroup School
 *
 * @apiSuccess {Number} result  1 || 0
 * @apiSuccessExample {json} 1
 */
exports.delete = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10);

    try {
        result = await schoolAdminService.remove(schoolId);
    } catch (error) {
        result = error;
        logger.error(util.inspect(error, { depth:4 }));
    }
    res.json(result);
};


/**
 * get school info
 * @api {get} /api/school/info
 * @apiVersion 0.1.0
 * @apiName getSchoolInfo
 * @apiGroup School
 *
 *
 * @apiSuccess {Object[]} school
 * @apiSuccess {Number}   school.id    school number
 * @apiSuccess {String}   school.name  school name
 * @apiSuccess {String}   school.type  school type 'лицей' or 'школа'
 * @apiSuccess {String}   school.numberComments number of comments
 * @apiSuccess {String}   school.totalScore     position in rating
 * @apiSuccess {Object[]} school.areaName       area name
 * @apiSuccess {Number}   school.districtName  distriсt name
 * @apiSuccess {Object[]} school.updatedAt
 * @apiSuccessExample {json} Example response:
 [{
    "id": 649,
    "name": "Лицей № 1502 при МЭИ",
    "type": "Лицей",
    "numberComments": 19,
    "totalScore": 4.6,
    "areaName": "Преображенское",
    "districtName": "ВАО",
    "updatedAt": "2016-11-21T09:52:57.749Z"
 }]
 *
 */
exports.getAllSchoolInfo = async function(req, res) {
    let result;
    try {
        result = await schoolAdminService.getAllSchoolInfo();
    } catch (error) {
        result = error;
        logger.error(util.inspect(error, { depth:4 }));
    }
    res.json(result);
};


/**
 * Get comment for school with user data
 * @api {get} /api/school/:schoolId/comment/:commentId
 * @apiVersion 0.1.0
 * @apiName getAllComments
 * @apiGroup School
 *
 * @apiSuccess {Object}   comment
 * @apiSuccess {Number}   comment.id
 * @apiSuccess {String}   comment.text
 * @apiSuccess {String}   comment.socialId
 * @apiSuccess {String}   comment.socialType
 * @apiSuccess {String}   comment.category
 * @apiSuccess {Number}   comment.score
 * @apiSuccess {String}   comment.updatedAt
 * {
 *     "id": 613,
       "text": "Образование\nНе все едино, но очень многие.\n
                Учителя\nУчителя очень близки с .",
        "author": "Вася",
        "socialId": "32423424",
        "socialType": "vk",
        "category": "Scholar",
        "score": 4.75,
        "updatedAt": "2016-11-21T09:50:32.184Z"
   }
 *
 */
exports.getComment = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        commentId: number = parseInt(req.params.commentId, 10);
    try {
        let comment =
            await schoolCommentService.getCommentWithUser(schoolId, commentId);
        if (!comment) {
            result = {};
        } else {
            result = commentView.comment(comment);
        }
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};


/**
 * Get all comments for school with user data
 * @api {get} /api/school/:schoolId/comment
 * @apiVersion 0.1.0
 * @apiName getAllComments
 * @apiGroup School
 *
 * @apiSuccess {Object[]} comments
 * @apiSuccess {Number}   comments.id
 * @apiSuccess {String}   comments.text
 * @apiSuccess {String}   comments.socialId
 * @apiSuccess {String}   comments.socialType
 * @apiSuccess {String}   comments.category
 * @apiSuccess {Number}   comments.score
 * @apiSuccess {String}   comments.updatedAt
 *  [
 *      {
            "id": 613,
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
 *
 */
exports.getAllComments = async function(req, res) {
    let result, schoolId:number = parseInt(req.params.schoolId, 10);
    try {
        let comments = await
            schoolCommentService.getAllCommentsWithUser(schoolId);
        if (!comments) {
            result = [];
        } else {
            result = commentView.comments(comments);
        }
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};


/**
 * Edit text comment
 * @api {put} /api/school/:schoolId/comment/:commentId
 * @apiVersion 0.1.0
 * @apiName editTextComment
 * @apiGroup School
 *
 * @apiSuccess {Object}   comment
 * @apiSuccess {Number}   comment.id
 * @apiSuccess {Number}   comment.comment_group_id
 * @apiSuccess {Number}   comment.rating_id
 * @apiSuccess {Number}   comment.user_data_id
 * @apiSuccess {String}   comment.text
 * @apiSuccess {String}   comment.source
 * @apiSuccess {Boolean}  comment.isNoticeSend
 * @apiSuccess {String}   comment.updatedAt
 * @apiSuccess {String}   comment.created_at
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
 *
 *
 */
exports.textEdit = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        commentId: number = parseInt(req.params.commentId, 10),
        text: string = req.body.text;
    try {
        result =
            await schoolCommentService.textEdit(schoolId, commentId, text);
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};


/**
 * Remove comment
 * @api {delete} /api/school/:schoolId/comment/:commentId
 * @apiVersion 0.1.0
 * @apiName removeComment
 * @apiGroup School
 *
 * @apiSuccess {Number} result  success or failed
 * @apiSuccess {Number} 1
 *
 */
exports.removeComment = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        commentId: number = parseInt(req.params.commentId, 10);
    try {
        result =
            await schoolCommentService.removeComment(schoolId, commentId);
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};
