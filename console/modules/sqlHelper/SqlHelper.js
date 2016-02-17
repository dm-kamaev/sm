'use strict';

const await = require('asyncawait/await');
const sequelize = require('../../../app/components/db');

class SqlHelper {

    /**
     * Fixes ID in table
     * @public
     * @param {string} tableName
     */
    static actualizeSequence(tableName) {
        var sqlString = 'SELECT setval(\'' + tableName +
                '_id_seq\', (SELECT MAX(id) from ' +
                tableName +'));';
        try {
            await(sequelize.query(
                sqlString,
                {
                    type: sequelize.QueryTypes.SELECT
                }
            ));
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete all data and reset ID
     * @public
     * @param {string} tableName
     */
    static resetTable(tableName) {
        var deleteAllData = 'DELETE FROM ' + tableName + ';',
            alterSequence = 'ALTER SEQUENCE ' +
            tableName + '_id_seq RESTART WITH 1',
            updateId = 'UPDATE ' + tableName + ' SET id = DEFAULT';
        await(sequelize.query(
            deleteAllData,
            {
                type: sequelize.QueryTypes.DELETE
            }
        ));
        await(sequelize.query(
            alterSequence,
            {
                type: sequelize.QueryTypes.SELECT
            }
        ));
        await(sequelize.query(
            updateId,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }
}

module.exports = SqlHelper;
