'use strict';

// author: dm-kamaev
// admin for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import schoolCommentService from '../services/schoolComment';
import commentView from '../views/commentView';
import schoolAdminService from '../services/schoolAdminService';
import SchoolNotExistTypeError from './errors/SchoolNotExistTypeError';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

class SchoolAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            SchoolNotExistTypeError,
        };
    }

    /**
     * create school
     * @api {post} /admin/api/school
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
     *{
     *  "name": "Школа №14",
     *  "abbreviation": "ГБОУ СОШ № 14",
     *  "fullName": "Государственное
     *               бюджетное образовательное учреждение города Москвы
     *               средняя общеобразовательная школа № 14",
     *  "schoolType": "Школа",
     *  "director": "Любимов Олег Вадимович",
     *  "phones": ["(495) 223-32-23", "(499)322-23-33"],
     *  "govermentKey": 100,
     *  "totalScore": 4,
     *  "features": [
     *          "В лицее нет традиционных классов: ученики делятся на группы в
     *           зависимости от выбранного ими учебного плана",
     *          "В расписании предусмотрены факультетские дни, которые лицеисты
     *           проводят на
     *           профильных факультетах НИУ ВШЭ*"
     *   ],
     *   "dressCode": true,
     *   "extendedDayCost": "3000 руб./мес.",
     *   links: [
     *       [
     *           "Гимназия на сайте Департамента образования Москвы",
     *           "1811.mskobr.ru"
     *       ],
     *       [
     *           " Сообщество гимназии Вконтакте",
     *           "vk.com/club86036747"
     *       ],
     *   ]
     *
     *}
     *
     */
    async actionCreate(ctx) {
        let result, schoolData = ctx.request.body;
        return await schoolAdminService.create(schoolData);
    }


    /**
     * update school
     * @api {put} /admin/api/school/:schoolId
     * @apiVersion 0.1.0
     * @apiName updateSchool
     * @apiGroup SchoolAdmin
     *
     * @apiParam {Number} schoolId schoolId
     * @apiParamExample {json} Request-Example:
     * {
     *     "dressCode": false,
     *     "phones": ["(495) 223-32-23", "(499)322-23-33"]
     * }
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
     * {
     *   "name": "Школа №14",
     *   "abbreviation": "ГБОУ СОШ № 14",
     *   "fullName": "Государственное
     *                бюджетное образовательное учреждение города Москвы
     *                средняя общеобразовательная школа № 14",
     *   "schoolType": "Школа",
     *   "director": "Любимов Олег Вадимович",
     *   "phones": ["(495) 223-32-23", "(499)322-23-33"],
     *   "govermentKey": 100,
     *   "totalScore": 4,
     *   "features": [
     *         "В лицее нет традиционных классов: ученики делятся на группы в
     *          зависимости от выбранного ими учебного плана",
     *         "В расписании предусмотрены факультетские дни, которые лицеисты
     *          проводят на
     *          профильных факультетах НИУ ВШЭ*"
     *   ],
     *   "dressCode": true,
     *   "extendedDayCost": "3000 руб./мес.",
     *   "links": [
     *       [
     *           "Гимназия на сайте Департамента образования Москвы",
     *           "1811.mskobr.ru"
     *       ],
     *       [
     *           " Сообщество гимназии Вконтакте",
     *           "vk.com/club86036747"
     *      ],
     *   ]
     * }
     *
     */
    async actionUpdate (ctx, schoolId: string) {
        let schoolData = ctx.request.body;
        return await schoolAdminService.update(
            parseInt(schoolId, 10),
            schoolData
        );
    }


    /**
     * remove school
     * @api {delete} /admin/api/school/:schoolId
     * @apiVersion 0.1.0
     * @apiName removeSchool
     * @apiGroup SchoolAdmin
     *
     * @apiParam {Number} schoolId schoolId
     *
     * @apiSuccessExample {Number} Example response:
     * 1
     */
    async actionDelete(ctx, schoolId: string) {
        return await schoolAdminService.remove(
            parseInt(schoolId, 10)
        );
    }


    /**
     * get school info
     * @api {get} /admin/api/school
     * @apiVersion 0.1.0
     * @apiName getAllSchool
     * @apiGroup SchoolAdmin
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
     * [{
     *    "id": 649,
     *    "name": "Лицей № 1502 при МЭИ",
     *    "type": "Лицей",
     *    "numberComments": 19,
     *    "totalScore": 4.6,
     *    "areaName": "Преображенское",
     *    "districtName": "ВАО",
     *    "updatedAt": "2016-11-21T09:52:57.749Z"
     * }]
     *
     */
    async actionGetAllSchool() {
        return await schoolAdminService.getAllSchool();
    }

    /**
     * @api {get} /api/admin/school/:id
     * @apiVersion 1.0.0
     * @apiName getSchool
     * @apiGroup School Admin
     *
     * @apiParam {Number} id School's id.
     *
     * @apiSuccess {String}   name            Name.
     * @apiSuccess {String}   fullName        Full name.
     * @apiSuccess {String}   abbreviation    Short name.
     * @apiSuccess {String}   description     Desctiption.
     * @apiSuccess {String[]} features        Features.
     * @apiSuccess {String}   schoolType      Type of school.
     * @apiSuccess {Boolean}  dressCode       Dress code.
     * @apiSuccess {String}   extendedDayCost Cost of extended day.
     * @apiSuccess {Number}   rankDogm        Place in mos.obr's rating.
     * @apiSuccess {Array}    links           Array of arrays.
     * @apiSuccess {Array}    links.-         Array of two strings.
     * @apiSuccess {String}   links.-.0       Name of link.
     * @apiSuccess {String}   links.-.1       Link itself.
     * @apiSuccess {String[]} phones          Array of phones.
     * @apiSuccess {String}   director        Director's name.
     */
    async actionGet(actionContext: any, id: number) {
        return schoolAdminService.getById(id);
    }

    /**
     * @api {get} /api/admin/schooltype
     * @apiVersion 1.0.0
     * @apiName getSchoolTypes
     * @apiGroup School Admin
     *
     * @apiSuccess {String[]} - Response body.
     */
    actionGetSchoolTypes(actionContext: any) {
        return schoolAdminService.getSchoolTypes();
    }
}

export {SchoolAdminController};
