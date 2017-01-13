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
 * @apiSuccess {String}   school.abbreviation  reduction school name
 * @apiSuccess {String}   school.fullName      full name school name
 * @apiSuccess {String}   school.schoolType    type
 * @apiSuccess {String}   school.director      fullname director
 * @apiSuccess {Object[]} school.phones        list phones
 * @apiSuccess {Number}   school.govermentKey  key for school in goverment
 * @apiSuccess {Object[]} school.features      list features
 * @apiSuccess {Boolean}  school.dressCode     exist dressCode
 * @apiSuccess {Object[][]} school.links    site/facebook/vk
 *     @apiSuccess {String} school.links[0] name "Гимназия на сайте Департамента образования Москвы"
 *     @apiSuccess {String} school.links[1] link "vk.com/club86036747"

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
 * remove school
 * @api {delete} /api/school/:schoolId
 * @apiVersion 0.1.0
 * @apiName removeSchool
 * @apiGroup School
 *
 * @apiSuccessExample {Number} Example response:
 * 1
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
