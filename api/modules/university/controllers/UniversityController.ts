import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as universityService} from '../services/university';
import {service as universityPageService} from '../services/universityPage';
import {universityPageView} from '../views/universityPageView';

import {UniversityNotFound} from './errors/UniversityNotFound';

class UniversityController extends Controller {
    constructor() {
        super();

        this.errors = {
            UniversityNotFoundException: UniversityNotFound
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
    public async actionGet(actionContext: any, universityId: string) {
        return await universityService.get(parseInt(universityId, 10));
    }
}

export {UniversityController};
