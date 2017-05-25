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
const UniversityNotFound_1 = require("./errors/UniversityNotFound");
class UniversityController extends Controller {
    constructor() {
        super();
        this.errors = {
            UniversityNotFoundException: UniversityNotFound_1.UniversityNotFound
        };
    }
    /**
     * @api {get} /api/university/:id Get university
     * @apiVersion 1.0.0
     * @apiName getUniversity
     * @apiGroup University
     *
     * @apiParam {Number}   id  University's id.
     *
     * @apiSuccess {Number}   id                  Id.
     * @apiSuccess {String}   name                Name.
     * @apiSuccess {String}   abbreviation        Abbreviation.
     * @apiSuccess {String}   description         Description.
     * @apiSuccess {String}   imageUrl            Image url.
     * @apiSuccess {String}   relapImageUrl       Relap image.
     * @apiSuccess {String[]} links               Links.
     * @apiSuccess {Boolean}  military_department Exist military department.
     * @apiSuccess {Boolean}  dormitory           Exist dormitory.
     * @apiSuccess {Number}   cityId              City's id.
     * @apiSuccess {String}   created_at          Date.
     * @apiSuccess {String}   updated_at          Date.
     * @apiSuccess {Object}   city                City.
     * @apiSuccess {Number}   city.id             City id.
     * @apiSuccess {String}   city.name           City name.
     * @apiSuccess {Number}   city.regionId       Region id.
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
     *            "regionId": null,
     *        }
     *    }
     * @apiError (404) UniversityNotFound University with given Id not found.
     */
    actionGet(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield university_1.service.get(Number(id));
        });
    }
    /**
     * @api {get} /api/universities Get universities by ids
     * @apiVersion 1.0.0
     * @apiName getUniversitiesByIds
     * @apiGroup University
     *
     * @apiParam (query) {Number[]} ids  Universities' ids.
     *
     * @apiSuccess {Number}   id                  Id.
     * @apiSuccess {String}   name                Name.
     * @apiSuccess {String}   abbreviation        Abbreviation.
     * @apiSuccess {String}   description         Description.
     * @apiSuccess {String}   imageUrl            Image url.
     * @apiSuccess {String}   relapImageUrl       Relap image.
     * @apiSuccess {String[]} links               Links.
     * @apiSuccess {Boolean}  militaryDepartment Exist military department.
     * @apiSuccess {Boolean}  dormitory           Exist dormitory.
     * @apiSuccess {Number}   cityId              City's id.
     * @apiSuccess {Number}   totalScore          Total score.
     * @apiSuccess {Number[]} score               Array of scores.
     * @apiSuccess {Number[]} scoreCount          Array of score count.
     * @apiSuccess {Number}   reviewCount         Review count.
     * @apiSuccess {String}   created_at          Date.
     * @apiSuccess {String}   updated_at          Date.
     * @apiSuccess {Object}   city                City.
     * @apiSuccess {Number}   city.id             City id.
     * @apiSuccess {String}   city.name           City name.
     * @apiSuccess {Number}   city.regionId       Region id.
     * @apiSuccess {Object[]} profiles            Array of profiles.
     * @apiSuccess {Number}   profiles.id         Profile's id.
     * @apiSuccess {String}   profiles.name       Profiles's name.
     *
     * @apiSuccessExample {json} Success-Response:
     *     [{
     *         "id": 64,
     *         "name": "Санкт-Петербургский государственный университет",
     *         "abbreviation": "СПбГУ",
     *         "description": "Петербург! По барам!",
     *         "imageUrl": null,
     *         "relapImageUrl": null,
     *         "links": null,
     *         "militaryDepartment": true,
     *         "dormitory": true,
     *         "cityId": 3,
     *         "created_at": "2017-03-15T09:46:35.010Z",
     *         "updated_at": "2017-03-15T09:46:35.010Z",
     *         "city": {
     *             "id": 3,
     *             "name": "санкт петербург",
     *             "regionId": null
     *         },
     *         profiles: []
     *     }]
     */
    actionGetByIds(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataIds = actionContext.data.ids;
            const ids = typeof dataIds === 'string' ?
                [Number(dataIds)] :
                dataIds.map(Number);
            return university_1.service.get(ids);
        });
    }
}
exports.UniversityController = UniversityController;
