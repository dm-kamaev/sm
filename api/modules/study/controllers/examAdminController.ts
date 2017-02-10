'use strict';

// author: dm-kamaev
// general for exam school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {examAdminService} from '../services/examAdminService';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

class ExamAdminController extends Controller {
    constructor() {
        super();
        this.errors = {};
    }


    /**
     * @api {get} /api/admin/schoolsubject Get all school subject
     * @apiVersion 1.0.0
     * @apiName getAllSchoolSubject
     * @apiGroup School Exam Admin
     *
     *
     * @apiSuccess {Object[]} subjects            Array of object.
     * @apiSuccess {Number}   subject.id          Subject's id
     * @apiSuccess {String}   subject.displayName Subject's name
     *
     * @apiSuccessExample {json} Example response:
     *    [
     *        {
     *            "id": 1,
     *            "displayName": "Математика"
     *        },
     *        {
     *            "id": 2,
     *            "displayName": "Информатика"
     *        }
     *    ]
     */
    public async actionGetListSubject() {
        return await examAdminService.getListSubject();
    }


    /**
     * @api {get} /api/admin/examyear Get all school subject
     * @apiVersion 1.0.0
     * @apiName getGiaEgeYear
     * @apiGroup School Exam Admin
     *
     *
     * @apiSuccess {Number[]} years  For gia and ege
     * @apiSuccess {Number}   year   Year
     *
     * @apiSuccessExample {json} Example response:
     *    [
     *        2007,
     *        2008,
     *        2009,
     *        2010,
     *        2011,
     *        2012,
     *        2013,
     *        2014,
     *        2015,
     *        2016,
     *        2017
     *    ]
     */
    public async actionGetListExamYear() {
        return examAdminService.getListExamYear();
    }

}

export {ExamAdminController};
