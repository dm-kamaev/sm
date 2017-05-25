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
// node commander.js updateCityNames
// update city's name first letter in upper case
const commander = require("commander");
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const services = require('../app/components/services').all;
class UpdateCityNames {
    constructor() { }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('-----START-----');
            const cities = [
                { oldName: 'москва', newName: 'Москва' },
                { oldName: 'санкт-петербург', newName: 'Санкт-Петербург' }
            ];
            try {
                const option = { type: sequelize.QueryTypes.SELECT };
                cities.forEach((city) => __awaiter(this, void 0, void 0, function* () {
                    const query = `
              SELECT id FROM city WHERE name ILIKE '%${city.oldName}%'
              `;
                    const cityDb = yield sequelize.query(query, option);
                    const cityId = cityDb[0] && cityDb[0].id;
                    if (cityId) {
                        const update = `
                  UPDATE city SET name='${city.newName}' WHERE id=${cityId}
                  `;
                        yield sequelize.query(update, option);
                    }
                }));
            }
            catch (error) {
                console.log('ERROR=', error);
            }
            logger.info('-----THE END-----');
        });
    }
}
;
commander
    .command('updateCityNames')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    yield new UpdateCityNames().start();
}));
exports.Command;
