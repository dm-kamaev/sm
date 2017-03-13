import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as cityService} from '../services/city';

import {
    CityNotFound,
    CityNameEmpty,
    CityNameNotValid,
    CityAlreadyExist,
    GeoCoder,
    GeoCoderRegionNotFound,
} from './errors/index';

class CityAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            CityNotFoundException: CityNotFound,
            CityNameEmptyException: CityNameEmpty,
            CityNameNotValidException: CityNameNotValid,
            CityAlreadyExistException: CityAlreadyExist,
            GeoCoderException: GeoCoder,
            GeoCoderRegionNotFoundException: GeoCoderRegionNotFound,
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
    public async actionList(actionContext: any) {
        return await cityService.getAll();
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
    public async actionGet(actionContext: any, cityId: string) {
        return await cityService.getById(parseInt(cityId, 10));
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
    public async actionCreate(actionContext: any) {
        const body = actionContext.request.body || {},
              cityName: string = body.name;
        return await cityService.create(cityName);
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
    public async actionUpdate(actionContext: any, cityId: string) {
        const body = actionContext.request.body || {},
              cityName: string = body.name;
        return await cityService.update(parseInt(cityId, 10), cityName);
    }
}

export {CityAdminController};
