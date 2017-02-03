'use strict'

// author: dm-kamaev
// add 2015 year for gia result, when year is empty

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');

const sequelize = require('../app/components/db.js');
const logger = require('../app/components/logger/logger.js').getLogger('app');

const YEAR = 2015;

const addYear = async(function () {
    try {
        logger.info('START');
        const query = `
            UPDATE gia_result SET
                year=${YEAR},
                created_at=STATEMENT_TIMESTAMP(),
                updated_at=STATEMENT_TIMESTAMP()
            WHERE year IS NULL
            `
        await(sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        }));
        logger.info('END');
    } catch (err) {
        logger.critical(JSON.stringify(err, null, 2));
    }
})


commander
    .command('addYearForGia')
    .description('add 2015 year for gia result, when year is empty')
    .action(addYear);

exports.Command;
