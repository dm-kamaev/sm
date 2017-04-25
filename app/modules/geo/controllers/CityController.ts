import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {cityService} from '../services/cityService';
import {cityView} from '../views/cityView';

export class CityController extends Controller {
    /**
     * @api {get} /cities/program Get all cities sorted by programs count
     * @apiVersion 1.0.0
     * @apiName getAllCitiesByProgramCount
     * @apiGroup City
     *
     * @apiSuccess {Object[]} -       Response body.
     * @apiSuccess {Number}   -.value City id.
     * @apiSuccess {String}   -.label City name.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         value: 2,
     *         label: "Москва"
     *     }]
     */
    public async actionProgramList(actionContext: any) {
        const cities = await cityService.getAllSortedByProgramCount();
        return cityView.filtersListRender(cities);
    }

    /**
     * @api {get} /cities Find city by name
     * @apiVersion 1.0.0
     * @apiName findCityByName
     * @apiGroup City
     *
     * @apiParam (query) {String} name Name's part of cities you search for.
     *
     * @apiSuccess {Object[]} - Response body.
     * @apiSuccess {Number}   -.value City's id.
     * @apiSuccess {String}   -.label City's name.
     */
    public async actionSearch(actionContext: any) {
        const searchString: string = actionContext.data.name || '';
        const foundCities = await cityService.findByName(searchString);
        return cityView.filtersListRender(foundCities);
    }
}
