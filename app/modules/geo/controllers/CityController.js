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
const cityService_1 = require("../services/cityService");
const cityView_1 = require("../views/cityView");
class CityController extends Controller {
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
    actionProgramList(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield cityService_1.cityService.getAllSortedByProgramCount();
            return cityView_1.cityView.filtersListRender(cities);
        });
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
    actionSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchString = actionContext.data.name || '';
            const foundCities = yield cityService_1.cityService.findByName(searchString);
            return cityView_1.cityView.filtersListRender(foundCities);
        });
    }
}
exports.CityController = CityController;
