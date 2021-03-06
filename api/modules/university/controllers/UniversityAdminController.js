"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require('nodules/controller').Controller;
const university_1 = require("../services/university");
const imageService = require('../../entity/services/image.js');
const universityAdmin_1 = require("../views/universityAdmin");
const UniversityImageSize_1 = require("../constants/UniversityImageSize");
const UniversityNotFound_1 = require("./errors/UniversityNotFound");
const UniversityNameIsEmpty_1 = require("./errors/UniversityNameIsEmpty");
const UniversityAliasDuplicate_1 = require("./errors/UniversityAliasDuplicate");
const UniversityAliasNotFound_1 = require("./errors/UniversityAliasNotFound");
class UniversityAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            UniversityNotFoundException: UniversityNotFound_1.UniversityNotFound,
            UniversityNameIsEmptyException: UniversityNameIsEmpty_1.UniversityNameIsEmpty,
            UniversityAliasDuplicateException: UniversityAliasDuplicate_1.UniversityAliasDuplicate,
            UniversityAliasNotFoundException: UniversityAliasNotFound_1.UniversityAliasNotFound,
        };
    }
    /**
     * @api {get} /api/admin/university Get all universities
     * @apiVersion 1.0.0
     * @apiName getAllUniversities
     * @apiGroup Admin University
     *
     * @apiSuccess {Object[]} -                Response body.
     * @apiSuccess {Number}   -.id             Id.
     * @apiSuccess {String}   -.name           Name.
     * @apiSuccess {String}   -.abbreviation   Abbreviation.
     * @apiSuccess {String}   -.cityName       Name of university's city.
     * @apiSuccess {Number}   -.programCount
     *     Number of university's programs.
     * @apiSuccess {String}   -.updatedAt      Updated at.
     * @apiSuccess {Object[]} -.profilesName   Array profiles
     *
     * @apiSuccessExample {json} Success-Response:
     *    [
     *        {
     *            "id": 64,
     *            "name": "Санкт-Петербургский государственный университет",
     *            "abbreviation": "СПбГУ",
     *            "cityName": "санкт петербург",
     *            "programCount": "0",
     *            "updatedAt": "2017-03-15T09:46:35.010Z",
     *            "profilesName": "высшая математика,экономика"
     *        },
     *        {
     *            "id": 62,
     *            "name": "Научно Исследовательский
     *                     Институт – Высшая Школа Экономики
     *                    ",
     *            "abbreviation": "НИУ-ВШЭ",
     *            "cityName": "москва",
     *            "programCount": "0",
     *            "updatedAt": "2017-03-15T09:46:35.010Z",
     *            "profilesName": null
     *        }
     *    ]
     */
    actionList(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield university_1.service.getAll();
            return universityAdmin_1.universityAdminView.renderAll(res);
        });
    }
    /**
     * @api {get} /api/admin/university/:id Get university by id
     * @apiVersion 1.0.0
     * @apiName getUniversity
     * @apiGroup Admin University
     *
     * @apiParam {Number} id  University's id.
     *
     * @apiSuccess {Number}   id                 Id.
     * @apiSuccess {String}   name               Name.
     * @apiSuccess {String}   abbreviation       Abbreviation.
     * @apiSuccess {String}   description        Description.
     * @apiSuccess {String}   image              Url for university image.
     * @apiSuccess {String}   relapImage         Url for relap image.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     * @apiSuccess {String[]} links              Array of links
     *     (official site, facebook communities).
     * @apiSuccess {Boolean}  militaryDepartment Military department.
     * @apiSuccess {Boolean}  dormitory          Dormitory.
     * @apiSuccess {Number}   totalScore         Total score.
     * @apiSuccess {Number[]} score              Array of scores.
     * @apiSuccess {Number[]} scoreCount         Array of scores' count.
     * @apiSuccess {Number}   reviewCount        Number of reviews.
     * @apiSuccess {String}   createdAt          Created at.
     * @apiSuccess {String}   updatedAt          Updated at.
     * @apiSuccess {Object}   city               City object.
     * @apiSuccess {Number}   city.id            City's id.
     * @apiSuccess {String}   city.name          City's name.
     * @apiSuccess {Number}   city.regionId      Id of city's region.
     * @apiSuccess {Object[]} profiles           University's profiles.
     * @apiSuccess {Number}   profiles.id        Profile id.
     * @apiSuccess {String}   profiles.name      Profile name.
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 64,
     *        "name": "Санкт-Петербургский государственный университет",
     *        "abbreviation": "СПбГУ",
     *        "description": "Петербург! По барам!",
     *        "imageUrl": null,
     *        "relapImageUrl": null,
     *        "links": null,
     *        "militaryDepartment": true,
     *        "dormitory": true,
     *        "cityId": 3,
     *        "created_at": "2017-03-15T09:46:35.010Z",
     *        "updated_at": "2017-03-15T09:46:35.010Z",
     *        "city": {
     *            "id": 3,
     *            "name": "санкт петербург",
     *            "regionId": null
     *        },
     *        "profiles": [
     *            {
     *                "id": 1,
     *                "name": "экономика"
     *            },
     *            {
     *                "id": 2,
     *                "name": "высшая математика"
     *            }
     *        ]
     *    }
     *
     * @apiError (404) UniversityNotFound University with given Id not found.
     */
    actionGet(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const university = yield university_1.service.get(Number(id));
            return universityAdmin_1.universityAdminView.render(university);
        });
    }
    /**
     * @api {post} /api/admin/university Create university
     * @apiVersion 1.0.0
     * @apiName createUniversity
     * @apiGroup Admin University
     *
     * @apiParam {File}     imageUrl           File should be send using
     *
     * @apiParamExample {json} Request-Example:
     *    {
     *        "name": "Санкт-Петербургский государственный университет",
     *        "abbreviation": "СПбГУ",
     *        "description": "Петербург! По барам!",
     *        "imageUrl": null,
     *        "relapImageUrl": null,
     *        "links": ["http://yandex.ru/1", "http://yandex.ru/2"],
     *        "militaryDepartment": true,
     *        "dormitory": true,
     *        "cityId": 3,
     *        "profiles": [1, 2]
     *    }
     *
     * @apiParam {File}     image              File should be send using
     *    multipart/form-data.
     * @apiParam {File}     relapImage         File should be send using
     *    multipart/form-data.
     * @apiParam {String}   name               Name.
     * @apiParam {String}   abbreviation       Abbreviation.
     * @apiParam {String}   description        Description.
     * @apiParam {String[]} links              Array of links
     *     (official site, facebook communities).
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
     * @apiSuccess {Number}   totalScore         Total score.
     * @apiSuccess {Number[]} score              Array of scores.
     * @apiSuccess {Number[]} scoreCount         Array of scores' count.
     * @apiSuccess {Number}   reviewCount        Number of reviews.
     * @apiSuccess {String}   created_at         Created at.
     * @apiSuccess {String}   updated_at         Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 93,
     *        "name": "Санкт-Петербургский государственный университет2",
     *        "abbreviation": "СПбГУ",
     *        "description": "Петербург! По барам!",
     *        "links": [
     *            "http://yandex.ru/1",
     *            "http://yandex.ru/2"
     *        ],
     *        "militaryDepartment": true,
     *        "dormitory": true,
     *        "cityId": 3,
     *        "updated_at": "2017-03-20T13:51:53.214Z",
     *        "created_at": "2017-03-20T13:51:53.214Z",
     *        "imageUrl": "http://image.www56.lan/i/p/pEhnXoNLTW/{width}.jpg",
     *        "relapImageUrl": null
     *    }
     * @apiError (422) UniversityNameIsEmpty    University's name is empty.
     * @apiError (422) UniversityAliasDuplicate University alias already exist.
     */
    actionCreate(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = actionContext.request;
            const body = request.body || {};
            const files = request.files || [];
            const universityData = {
                name: body.name,
                abbreviation: body.abbreviation,
                description: body.description,
                links: body.links,
                militaryDepartment: body.militaryDepartment,
                dormitory: body.dormitory,
                cityId: body.cityId,
            };
            const image = files.find(file => file.fieldname === 'image');
            const relapImage = files.find(file => file.fieldname === 'relapImage');
            if (image) {
                const imageUrls = yield imageService.upload([image], [UniversityImageSize_1.UniversityImageSize.DEFAULT, UniversityImageSize_1.UniversityImageSize.MEDIUM]);
                universityData.imageUrl = imageUrls[0];
            }
            if (relapImage) {
                const relapImageUrls = yield imageService.upload([relapImage], [UniversityImageSize_1.UniversityImageSize.RELAP]);
                universityData.relapImageUrl = relapImageUrls[0];
            }
            const profileIds = body.profiles;
            return university_1.service.create(universityData, profileIds);
        });
    }
    /**
     * @api {put} /api/admin/university/:id Update university
     * @apiVersion 1.0.0
     * @apiName updateUniversity
     * @apiGroup Admin University
     *
     * @apiParam {Number} id  University's id.
     *
     * @apiParam {File}     image              File should be send using
     *    multipart/form-data.
     * @apiParam {File}     relapImage         File should be send using
     *    multipart/form-data.
     * @apiParam {String}   name               Name.
     * @apiParam {String}   abbreviation       Abbreviation.
     * @apiParam {String}   description        Description.
     * @apiParam {String[]} links              Array of links
     *     (official site, facebook communities)
     * @apiParam {Boolean}  militaryDepartment Military department.
     * @apiParam {Boolean}  dormitory          Dormitory.
     * @apiParam {Number}   cityId             City's id.
     *
     *
     * @apiSuccess {Number}   id                 Id.
     * @apiSuccess {String}   name               Name.
     * @apiSuccess {String}   imageUrl           Url for university image.
     * @apiSuccess {String}   relapImageUrl      Url for relap image.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     *     It has {width} parameter in it, which should be replaced for required
     *     width size in px.
     * @apiSuccess {Object}   city               City object.
     * @apiSuccess {Number}   city.id            City's id.
     * @apiSuccess {String}   city.name          City's name.
     * @apiSuccess {Number}   city.regionId      Id of city's region.
     * @apiSuccess {Number}   totalScore         Total score.
     * @apiSuccess {Number[]} score              Array of scores.
     * @apiSuccess {Number[]} scoreCount         Array of scores' count.
     * @apiSuccess {Number}   reviewCount        Number of reviews.
     * @apiSuccess {String[]} links              Array of links
     *     (official site, facebook communities).
     * @apiSuccess {Boolean}  militaryDepartment Military department.
     * @apiSuccess {Boolean}  dormitory          Dormitory.
     * @apiSuccess {Number}   city_id            City's id.
     * @apiSuccess {String}   created_at         Created at.
     * @apiSuccess {String}   updated_at         Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 99,
     *        "name": "Санкт-Петербургский государственный университет3",
     *        "abbreviation": "СПбГУ",
     *        "description": "Петербург! По барам!",
     *        "links": [
     *            "http://yandex.ru/1",
     *            "http://yandex.ru/2"
     *        ],
     *        "dormitory": true,
     *        "city_id": 3,
     *        "created_at": "2017-03-21T08:04:15.095Z",
     *        "updated_at": "2017-03-21T08:05:54.673Z",
     *        "imageUrl": "http://image.www56.lan/i/p/pEhnXoNLTW/{width}.jpg",
     *        "relapImageUrl": null,
     *        "militaryDepartment": true
     *    }
     * @apiError (422) UniversityNameIsEmpty    University's name is empty.
     * @apiError (422) UniversityAliasDuplicate University alias already exist.
     * @apiError (404) UniversityAliasNotFound  University alias not found.
     */
    actionUpdate(actionContext, universityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = actionContext.request;
            const body = request.body;
            const files = request.files || [];
            const universityData = {
                name: body.name,
                abbreviation: body.abbreviation,
                description: body.description,
                links: body.links,
                militaryDepartment: body.militaryDepartment,
                dormitory: body.dormitory,
                cityId: body.cityId
            };
            const image = files.find(file => file.fieldname === 'image');
            const relapImage = files.find(file => file.fieldname === 'relapImage');
            if (image) {
                const imageUrls = yield imageService.upload([image], [UniversityImageSize_1.UniversityImageSize.DEFAULT, UniversityImageSize_1.UniversityImageSize.MEDIUM]);
                universityData.imageUrl = imageUrls[0];
            }
            if (relapImage) {
                const relapImageUrls = yield imageService.upload([relapImage], [UniversityImageSize_1.UniversityImageSize.RELAP]);
                universityData.relapImageUrl = relapImageUrls[0];
            }
            const profileIds = body.profiles;
            return yield university_1.service.update(parseInt(universityId, 10), universityData, profileIds);
        });
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
    actionDelete(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return university_1.service.delete(id);
        });
    }
}
exports.UniversityAdminController = UniversityAdminController;
