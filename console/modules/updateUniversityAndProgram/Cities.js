'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// author: dm-kamaev
// update cities
const lodash = require("lodash");
const logger = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
const city_1 = require("../../../api/modules/geo/services/city");
class Cities {
    constructor(option) {
        option = option || {};
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
    }
    updateViaXlsx() {
        return __awaiter(this, void 0, void 0, function* () {
            let cityNames = this.extractCities(this.listProgram_);
            const hashCity = yield this.getHashCity();
            cityNames = lodash.uniq(cityNames);
            cityNames = cityNames.filter(cityName => cityName);
            // console.log(hashCity);
            // console.log('cityNames=', cityNames, cityNames.length);
            try {
                let sequence = Promise.resolve();
                const promiseCities = cityNames.map((cityName) => {
                    sequence = sequence.then(() => this.create(cityName, hashCity));
                    return sequence;
                });
                yield Promise.all(promiseCities);
                logger.info('Success cities updateViaXlsx');
            }
            catch (error) {
                logger.critical('Error: updateCity=> ' + error);
            }
        });
    }
    getHashCity() {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield city_1.service.getAll();
            const hashCity = {};
            cities.forEach((city) => {
                hashCity[city.name] = city.id;
            });
            return hashCity;
        });
    }
    extractCities(listProgram) {
        const cityColumn = this.hashColumn_.city;
        return listProgram.map(program => program[cityColumn]);
    }
    create(cityName, hashCity) {
        return __awaiter(this, void 0, void 0, function* () {
            cityName = city_1.service.cleanCityName(cityName);
            let res = null;
            if (!hashCity[cityName]) {
                try {
                    res = yield city_1.service.create(cityName);
                }
                catch (error) {
                    logger.critical('Error: cityService.create=> ' + error);
                }
            }
            return res;
        });
    }
}
exports.Cities = Cities;
;
