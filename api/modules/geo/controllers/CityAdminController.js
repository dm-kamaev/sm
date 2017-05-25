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
const city_1 = require("../services/city");
const index_1 = require("./errors/index");
class CityAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            CityNotFoundException: index_1.CityNotFound,
            CityNameEmptyException: index_1.CityNameEmpty,
            CityNameNotValidException: index_1.CityNameNotValid,
            CityAlreadyExistException: index_1.CityAlreadyExist,
            GeoCoderException: index_1.GeoCoder,
            GeoCoderRegionNotFoundException: index_1.GeoCoderRegionNotFound,
        };
    }
    /**
     * @api {get} /api/admin/city Get all cities
     * @apiVersion 1.0.0
     * @apiName getAllCities
     * @apiGroup Admin City
     *
     * @apiSuccess {Object[]} -        Response body.
     * @apiSuccess {Number}   -.id     City id.
     * @apiSuccess {String}   -.name   City name.
     * @apiSuccess {Object}   -.region Region.
     * @apiSuccess {Number}       -.region.id    Region id.
     * @apiSuccess {String}       -.region.name  Region name.
     * @apiSuccessExample {json} Success-Response:
     *    [
     *        {
     *            "id": 2,
     *            "name": "Москва",
     *            "regionId": 1,
     *            "region": {
     *                "id": 1,
     *                "name": "центральный"
     *            }
     *        }
     *    ]
     */
    actionList(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield city_1.service.getAll();
        });
    }
    /**
     * @api {get} /api/admin/city/:id Get city by id
     * @apiVersion 1.0.0
     * @apiName getCity
     * @apiGroup Admin City
     *
     * @apiParam {Number} id   City's id.
     *
     * @apiSuccess {Number}   id     City id.
     * @apiSuccess {String}   name   City name.
     * @apiSuccess {Object}   region Region.
     * @apiSuccess {Number}       -.id    Region id.
     * @apiSuccess {String}       -.name  Region name.
     *
     * @apiSuccessExample {json} Success-Response:
     *       {
     *        "id": 2,
     *        "name": "Москва",
     *        "regionId": 1,
     *        "region": {
     *            "id": 1,
     *            "name": "центральный"
     *        }
     *    }
     * @apiError (404) CityNotFound City with given Id not found.
     */
    actionGet(actionContext, cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield city_1.service.getById(parseInt(cityId, 10));
        });
    }
    /**
     * @api {post} /api/admin/city Create city
     * @apiVersion 1.0.0
     * @apiName createCity
     * @apiGroup Admin City
     *
     * @apiParam {String} name City's name.
     * @apiParamExample {json} Request-Example:
     *    {
     *        "name": "волгодонск",
     *    }
     * @apiSuccess {Object} Response body.
     * @apiSuccess {Number} id         City id.
     * @apiSuccess {String} name       City name.
     * @apiSuccess {Number} regionId   Region Id.
     * @apiSuccess {String} updated_at date
     * @apiSuccess {String} created_at date
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 26,
     *        "name": "волгодонск",
     *        "regionId": 2,
     *        "updated_at": "2017-03-13T08:59:36.444Z",
     *        "created_at": "2017-03-13T08:59:36.444Z"
     *    }
     * @apiError (422) CityNameEmpty    City name is empty
     * @apiError (422) CityNameNotValid City name not valid.
     * @apiError (422) CityAlreadyExist City already exist by name.
     * @apiError (503) GeoCoder         Connection error with yandex geocoder.
     * @apiError (404) GeoCoderRegionNotFound
     * Not found region via yandex geocoder.
     */
    actionCreate(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body || {}, cityName = body.name;
            return yield city_1.service.create(cityName);
        });
    }
    /**
     * @api {put} /api/admin/city/:id Update city
     * @apiVersion 1.0.0
     * @apiName updateCity
     * @apiGroup Admin City
     *
     * @apiParam {Number} id   City's id.
     * @apiParam {String} name City's new name.
     * @apiParamExample {json} Request-Example:
     *    {
     *        "name": "волгодонск",
     *    }
     *
     * @apiSuccess {Object} Response body.
     * @apiSuccess {Number} id         City id.
     * @apiSuccess {String} name       City name.
     * @apiSuccess {Number} regionId   Region Id.
     * @apiSuccess {String} updated_at date
     * @apiSuccess {String} created_at date
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 26,
     *        "name": "волгодонск",
     *        "regionId": 2,
     *        "updated_at": "2017-03-13T08:59:36.444Z",
     *        "created_at": "2017-03-13T08:59:36.444Z"
     *    }
     * @apiError (422) CityNameEmpty    City name is empty
     * @apiError (422) CityNameNotValid City name not valid.
     * @apiError (422) CityAlreadyExist City already exist by name.
     * @apiError (503) GeoCoder         Connection error with yandex geocoder.
     * @apiError (404) GeoCoderRegionNotFound
     * Not found region via yandex geocoder.
     */
    actionUpdate(actionContext, cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body || {}, cityName = body.name;
            return yield city_1.service.update(parseInt(cityId, 10), cityName);
        });
    }
}
exports.CityAdminController = CityAdminController;
