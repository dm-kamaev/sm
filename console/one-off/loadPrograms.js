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
// example call:
// node console/one-off/loadPrograms.js --path=../../assets/universities/
// put files:
// university.csv, program_major.csv and
// program.csv in folder assets/universities/
const asyncLegacy = require('asyncawait/async'), awaitLegacy = require('asyncawait/await');
const path = require("path");
const minimist = require("minimist");
const sequelize = require('../../app/components/db.js');
const logger = require('../../app/components/logger/logger.js')
    .getLogger('app');
const Archiver = require('../modules/modelArchiver/Archiver.js');
/**
 * @param {string} pathFolder
 */
module.exports = function (pathFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        pathFolder = path.join(__dirname, pathFolder);
        sequelize.options.logging = false;
        try {
            yield [
                368, 369, 370, 371, 372, 373, 374
            ].forEach(function (commentGroupId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const query = `
            INSERT INTO
              comment_group
              VALUES(${commentGroupId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
              ON CONFLICT (id)
              DO UPDATE
                SET updated_at = CURRENT_TIMESTAMP;
            `;
                    yield sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
                });
            });
            const query = `
        INSERT INTO
          city
          VALUES(
              3, 'санкт петербург', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, null
          )
          ON CONFLICT (id)
          DO UPDATE
            SET name = 'санкт петербург',
               updated_at = CURRENT_TIMESTAMP;
        `;
            yield sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        }
        catch (error) {
            logger.critical(error);
            logger.critical('Insert comment_group and city: ' +
                JSON.stringify(error, null, 2));
        }
        const insert = asyncLegacy(function () {
            try {
                const archiver = new Archiver(pathFolder);
                const DELIMITER = '|';
                awaitLegacy(archiver.copyToTable('university', pathFolder + 'university.csv', DELIMITER));
                awaitLegacy(archiver.copyToTable('program', pathFolder + 'program.csv', DELIMITER));
                awaitLegacy(archiver.copyToTable('entrance_statistic', pathFolder + 'entranceStatistic.csv', DELIMITER));
                awaitLegacy(archiver.copyToTable('page', pathFolder + 'page.csv', DELIMITER));
                awaitLegacy(archiver.copyToTable('university_page', pathFolder + 'universityPage.csv', DELIMITER));
                awaitLegacy(archiver.copyToTable('program_page', pathFolder + 'programPage.csv', DELIMITER));
            }
            catch (error) {
                logger.critical(error);
                logger.critical('Insert: ' + JSON.stringify(error, null, 2));
            }
        });
        yield insert();
        logger.info('---THE END---');
    });
};
if (!module.parent) {
    const args = minimist(process.argv.slice(2));
    module.exports(args.path);
}
