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
    actionProgramList(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return city_1.service.getAllSortedByProgramCount();
        });
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
    actionSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchString = actionContext.data.name || '';
            return city_1.service.findByName(searchString);
        });
    }
}
exports.CityController = CityController;
