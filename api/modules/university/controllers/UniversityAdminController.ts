import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {UniversityAttribute} from '../models/University';

import {service as universityService} from '../services/university';
const imageService = require('../../entity/services/image');

import {UniversityNotFound} from './errors/UniversityNotFound';

import {UniversityImageSize} from '../constants/UniversityImageSize';

class UniversityAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            UniversityNotFoundException: UniversityNotFound
        };
    }

    /**
     * @api {get} /api/admin/university Get all universities
     * @apiVersion 1.0.0
     * @apiName getAllUniversities
     * @apiGroup Admin University
     *
     * @apiSuccess {Object[]} -                    Response body.
     * @apiSuccess {Number}   -.id                 Id.
     * @apiSuccess {String}   -.name               Name.
     * @apiSuccess {String}   -.abbreviation       Abbreviation.
     * @apiSuccess {String}   -.description        Description.
     * @apiSuccess {String}   -.imageUrl           Url for university image.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     * @apiSuccess {String[]} -.links              Array of links
     *     (official site, facebook communities)
     * @apiSuccess {Boolean}  -.militaryDepartment Military department.
     * @apiSuccess {Boolean}  -.dormitory          Dormitory.
     * @apiSuccess {Object}   -.cityId             City's id.
     * @apiSuccess {String}   -.created_at         Created at.
     * @apiSuccess {String}   -.updated_at         Updated at.
     */
    public async actionList(actionContext: any) {
        return universityService.getAll();
    }

    /**
     * @api {get} /api/admin/university/:id Get university by id
     * @apiVersion 1.0.0
     * @apiName getUniversity
     * @apiGroup Admin University
     *
     * @apiSuccess {Number}   id                 Id.
     * @apiSuccess {String}   name               Name.
     * @apiSuccess {String}   abbreviation       Abbreviation.
     * @apiSuccess {String}   description        Description.
     * @apiSuccess {String}   imageUrl           Url for university image.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     * @apiSuccess {String[]} links              Array of links
     *     (official site, facebook communities)
     * @apiSuccess {Boolean}  militaryDepartment Military department.
     * @apiSuccess {Boolean}  dormitory          Dormitory.
     * @apiSuccess {Object}   city               City object.
     * @apiSuccess {Number}   city.id            City's id.
     * @apiSuccess {String}   city.name          City's name.
     * @apiSuccess {String}   city.created_at    City's created at date.
     * @apiSuccess {String}   city.updated_at    City's updated at date.
     * @apiSuccess {String}   created_at         Created at.
     * @apiSuccess {String}   updated_at         Updated at.
     *
     * @apiError (404) UniversityNotFound University with given Id not found.
     */
    public async actionGet(actionContext: any, id: any) {
        return universityService.get(id);
    }

    /**
     * @api {post} /api/admin/university Create university
     * @apiVersion 1.0.0
     * @apiName createUniversity
     * @apiGroup Admin University
     *
     * @apiParam {File}     image              File should be send using
     *    multipart/form-data.
     * @apiParam {String}   name               Name.
     * @apiParam {String}   abbreviation       Abbreviation.
     * @apiParam {String}   description        Description.
     * @apiParam {String[]} links              Array of links
     *     (official site, facebook communities)
     * @apiParam {Boolean}  militaryDepartment Military department.
     * @apiParam {Boolean}  dormitory          Dormitory.
     * @apiParam {Number}   cityId             City's id.
     * @apiParam {String}   created_at         Created at.
     * @apiParam {String}   updated_at         Updated at.
     *
     * @apiSuccess {Number}   id                 Id.
     * @apiSuccess {String}   name               Name.
     * @apiSuccess {String}   abbreviation       Abbreviation.
     * @apiSuccess {String}   description        Description.
     * @apiSuccess {String}   imageUrl           Url for university image.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     * @apiSuccess {String[]} links              Array of links
     *     (official site, facebook communities)
     * @apiSuccess {Boolean}  militaryDepartment Military department.
     * @apiSuccess {Boolean}  dormitory          Dormitory.
     * @apiSuccess {Object}   cityId             City's id.
     * @apiSuccess {String}   created_at         Created at.
     * @apiSuccess {String}   updated_at         Updated at.
     */
    public async actionCreate(actionContext: any) {
        const request = actionContext.request;
        const body = request.body;
        const universityData: UniversityAttribute = {
            name: body.name,
            abbreviation: body.abbreviation,
            description: body.description,
            links: body.links,
            militaryDepartment: body.militaryDepartment,
            dormitory: body.dormitory,
            cityId: body.cityId
        };
        if (request.files) {
            const imageUrls = await imageService.upload(
                request.files,
                [UniversityImageSize.DEFAULT, UniversityImageSize.SMALL]
            );
            universityData.imageUrl = imageUrls[0];
        }
        return universityService.create(universityData);
    }

    /**
     * @api {put} /api/admin/university/:id Update university
     * @apiVersion 1.0.0
     * @apiName updateUniversity
     * @apiGroup Admin University
     *
     * @apiParam {File}     image              File should be send using
     *    multipart/form-data.
     * @apiParam {String}   name               Name.
     * @apiParam {String}   abbreviation       Abbreviation.
     * @apiParam {String}   description        Description.
     * @apiParam {String[]} links              Array of links
     *     (official site, facebook communities)
     * @apiParam {Boolean}  militaryDepartment Military department.
     * @apiParam {Boolean}  dormitory          Dormitory.
     * @apiParam {Number}   cityId             City's id.
     * @apiParam {String}   created_at         Created at.
     * @apiParam {String}   updated_at         Updated at.
     *
     * @apiSuccess {Array}  -    Response body.
     * @apiSuccess {Number} -[0] Number of updated rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     [
     *         1
     *     ]
     */
    public async actionUpdate(actionContext: any, id: any) {
        const request = actionContext.request;
        const body = request.body;
        const universityData: UniversityAttribute = {
            name: body.name,
            abbreviation: body.abbreviation,
            description: body.description,
            links: body.links,
            militaryDepartment: body.militaryDepartment,
            dormitory: body.dormitory,
            cityId: body.cityId
        };
        if (request.files) {
            const imageUrls = await imageService.upload(
                request.files,
                [UniversityImageSize.DEFAULT, UniversityImageSize.SMALL]
            );
            universityData.imageUrl = imageUrls[0];
        }
        return universityService.update(id, universityData);
    }

    /**
     * @api {delete} /api/admin/university/:id Delete university
     * @apiVersion 1.0.0
     * @apiName deleteUniversity
     * @apiGroup Admin University
     *
     * @apiParam {Number} id   University's id.
     *
     * @apiSuccess {Number}  - Number of deleted rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     1
     */
    public async actionDelete(actionContext: any, id: any) {
        return universityService.delete(id);
    }
}

export {UniversityAdminController};
