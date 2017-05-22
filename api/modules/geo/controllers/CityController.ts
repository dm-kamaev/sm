import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as cityService} from '../services/city';

class CityController extends Controller {
    /**
     * @api {get} /api/cities/program Get all cities sorted by programs count
     * @apiVersion 1.0.0
     * @apiName getAllCitiesByProgramCount
     * @apiGroup City
     *
     * @apiSuccess {Object[]} -          Response body.
     * @apiSuccess {Number}   -.id       City id.
     * @apiSuccess {String}   -.name     City name.
     * @apiSuccess {Number}   -.regionId Region id.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         id: 2,
     *         name: "Москва",
     *         regionId: 2
     *     }]
     */
    public async actionProgramList(actionContext: any) {
        return cityService.getAllSortedByProgramCount();
    }

    /**
     * @api {get} /api/cities Find city by name
     * @apiVersion 1.0.0
     * @apiName findCityByName
     * @apiGroup City
     *
     * @apiParam (query) {String} name Name's part of cities you search for.
     *
     * @apiSuccess {Object[]} - Response body.
     * @apiSuccess {Number}   -.id City's id.
     * @apiSuccess {String}   -.name City's name.
     * @apiSuccess {Number}   -.regionId Region's id.
     */
    public async actionSearch(actionContext: any) {
        const searchString: string = actionContext.data.name || '';
        return cityService.findByName(searchString);
    }
}

export {CityController};
