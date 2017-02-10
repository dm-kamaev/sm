'use strict';

// author: dm-kamaev
// admin additional class for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {egeAdminService} from '../services/egeAdminService';
import {additionalClassAdminService}
    from '../services/additionalClassAdminService';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');
import {SchoolCategoryNameIsShorter} from
    './errors/SchoolCategoryNameIsShorter';

class AdditionalClassAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            SchoolCategoryNameIsShorter,
        };
    }


    /**
     * @api {get} /api/admin/school/:schoolId/additionalclass
     * Get all school additional classes
     * @apiVersion 1.0.0
     * @apiName getAllSchoolAdditionalClasses
     * @apiGroup School Additional Classes Admin
     *
     * @apiParam {Number} schoolId School's id.
     *
     * @apiSuccess {Object[]} additionalClasses               Array of object.
     * @apiSuccess {Number}   additionalClasses.id            Id.
     * @apiSuccess {Number}   additionalClasses.categoryId    Category's id
     * @apiSuccess {String}   additionalClasses.categoryName  Category's name
     * @apiSuccess {Number}   additionalClasses.name          Class's name
     *
     * @apiSuccessExample {json} Example response:
     *    [
     *        {
     *            "id": 1,
     *            "categoryId": 8,
     *            "categoryName": "Раннее развитие творческих способностей
     *                             детей",
     *            "name": "Кружок тест"
     *        },
     *        {
     *            "id": 2,
     *            "categoryId": 18,
     *            "categoryName": "Вокальный ансамбль",
     *            "name": "Кружок тест2"
     *        },
     *        {
     *            "id": 3,
     *            "categoryId": 2,
     *            "categoryName": "Страноведение",
     *            "name": "Кружок тест"
     *        }
     *    ]
     */
    public async actionList(ctx: any, schoolId: string) {
        return await additionalClassAdminService.getList(
            parseInt(schoolId, 10)
        );
    }


     /**
     * @api {get}
     * /api/admin/school/:schoolId/additionalClass/:id
     * Get school's additional class
     * @apiVersion 1.0.0
     * @apiName getSchoolAdditionalClass
     * @apiGroup School Additional Classes Admin
     *
     * @apiParam {Number} schoolId   School's id.
     * @apiParam {Number} id         Additional class id.
     *
     * @apiSuccess {Number}   additionalClass.id            Id.
     * @apiSuccess {Number}   additionalClass.categoryId    Category's id
     * @apiSuccess {String}   additionalClass.categoryName  Category's name
     * @apiSuccess {Number}   additionalClass.name          Class's name
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 1,
     *        "categoryId": 8,
     *        "categoryName": "Раннее развитие творческих способностей детей",
     *        "name": "Кружок тест"
     *    }
     */
    public async actionGet(
        ctx: any,
        schoolId: string,
        additionalClassId: string
    ) {
        return await additionalClassAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(additionalClassId, 10)
        );
    }

    /**
    * @api {post} api/admin/school/:schoolId/additionalClass
    * Create school's additional classes
    * @apiVersion 1.0.0
    * @apiName createSchoolAdditionalClass
    * @apiGroup School Additional Classes Admin
    *
    * @apiParamExample {json} Request-Example:
    *    {
    *        "categoryId": 2,
    *        "name": "Кружок тест"
    *    }
    *
    * @apiParam {Number} schoolId  School's id.
    *
    * @apiSuccess {Number}   additionalClass.id         Additional class id.
    * @apiSuccess {String}   additionalClass.name       Class's name
    * @apiSuccess {Number}   additionalClass.categoryId Category's id
    * @apiSuccess {Number}   additionalClass.schoolId   School's id
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 2,
    *        "name": "Кружок тест2",
    *        "categoryId": 18,
    *        "schoolId": 697
    *    }
    */
    public async actionCreate(ctx: any, schoolId: string) {
        const additionalClass: {
          categoryId: number,
          name: string,
        } = ctx.request.body;
        return await additionalClassAdminService.create(
            parseInt(schoolId, 10),
            additionalClass
        );
    }


    /**
    * @api {put}
    * /api/admin/school/:schoolId/additionalClass/:id
    * Update school additional class
    * @apiVersion 1.0.0
    * @apiName updateAdditionalClass
    * @apiGroup School Additional Classes Admin
    *
    * @apiParamExample {json} Request-Example:
    *    {
    *        "categoryId": 18,
    *        "name": "Кружок тест"
    *    }
    *
    * @apiParam {Number} schoolId School's id.
    * @apiParam {Number} id       Additional class id
    *
    * @apiSuccess {Number}   additionalClass.id            Id.
    * @apiSuccess {String}   additionalClass.name          Class's name
    * @apiSuccess {Number}   additionalClass.categoryId    Category's id
    * @apiSuccess {Number}   additionalClass.schoolId      School's id
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 2,
    *        "name": "Кружок тест2",
    *        "categoryId": 18,
    *        "schoolId": 697
    *    }
    */
    public async actionUpdate(
        ctx: any,
        schoolId: string,
        additionalClassId: string
    ) {
        const additionalClass: {
          categoryId: number,
          name: string,
        } = ctx.request.body;
        return await additionalClassAdminService.update(
            parseInt(schoolId, 10),
            parseInt(additionalClassId, 10),
            additionalClass
        );
    }

    /**
    * @api {delete}
    * /api/admin/school/:schoolId/additionalClass/:id
    * Delete school additional class
    * @apiVersion 1.0.0
    * @apiName deleteAdditionalClass
    * @apiGroup School Additional Classes Admin
    *
    * @apiParam {Number} schoolId            School's id.
    * @apiParam {Number} additionalClassId   Additional class's id
    *
    * @apiSuccess {Number} result delete
    *
    * @apiSuccessExample {json} Example response:
    *     1
    *
    */
    public async actionDelete(
        ctx: any,
        schoolId: string,
        additionalClassId: string
    ) {
        return await additionalClassAdminService.delete(
            parseInt(schoolId, 10),
            parseInt(additionalClassId, 10),
        );
    }


    /**
    * @api {get} /api/admin/schooladditionalclasscategory?searchString=му
    * Search category's additional class for schools
    * @apiVersion 1.0.0
    * @apiName searchAdditionalClassCategory
    * @apiGroup School Additional Classes Admin
    *
    * @apiParam {String} searchString        Search class category name
    *
    * @apiSuccess {Object[]} category         array of object.
    * @apiSuccess {Number}   category.id      Id.
    * @apiSuccess {String}   category.name    Name
    *
    * @apiSuccessExample {json} Example response:
    *    [
    *        {
    *            "id": 35,
    *            "name": "Музыкальное воспитание дошкольников"
    *        },
    *        {
    *            "id": 188,
    *            "name": "Музееведение"
    *        },
    *        {
    *            "id": 196,
    *            "name": "Музейное дело"
    *        }
    *    ]
    * @apiError (422) SchoolCategoryNameIsShorter
    *     is shorter searchString
    */
    public async actionListCategory(ctx: any) {
        const query: { searchString: string } = ctx.request.query;
        const categoryName: string  = query.searchString || '';
        return await additionalClassAdminService.searchCategory(categoryName);
    }
}

export {AdditionalClassAdminController};
