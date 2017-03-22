'use strict';

// author: dm-kamaev
// example call:
// node console/one-off/loadPrograms.js --path=../../assets/universities/
// put files:
// university.csv, program_major.csv and
// program.csv in folder assets/universities/

const asyncLegacy = require('asyncawait/async'),
      awaitLegacy = require('asyncawait/await');
import * as fs from 'fs';
import * as path from 'path';
import * as minimist from 'minimist';

const sequelize = require('../../app/components/db.js');
const logger = require('../../app/components/logger/logger.js')
    .getLogger('app');
const Archiver = require('../modules/modelArchiver/Archiver.js');



/**
 * @param {string} pathFolder
 */
module.exports = async function(pathFolder) {
    pathFolder = path.join(__dirname, pathFolder);
    sequelize.options.logging = false;
    try {
        await [
            368, 369, 370, 371, 372, 373, 374
        ].forEach(async function(commentGroupId) {
            const query: string =
            `
            INSERT INTO
              comment_group
              VALUES(${commentGroupId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
              ON CONFLICT (id)
              DO UPDATE
                SET updated_at = CURRENT_TIMESTAMP;
            `;
            await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
        });
        const query: string =
        `
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
        await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    } catch (error) {
        logger.critical(error);
        logger.critical(
            'Insert comment_group and city: ' +
            JSON.stringify(error, null, 2)
        );
    }

    const insert = asyncLegacy(function() {
        try {
            const archiver = new Archiver(pathFolder);
            const DELIMITER = '|';
            awaitLegacy(
                archiver.copyToTable(
                    'university',
                    pathFolder + 'university.csv',
                    DELIMITER
                )
            );
            awaitLegacy(
                archiver.copyToTable(
                    'program',
                    pathFolder + 'program.csv',
                    DELIMITER
                )
            );
        } catch (error) {
            logger.critical(error);
            logger.critical(
                'Insert: ' + JSON.stringify(error, null, 2)
            );
        }
    });
    await insert();
    logger.info('---THE END---');
};

if (!module.parent) {
    const args = minimist(process.argv.slice(2));
    module.exports(args.path);
}

