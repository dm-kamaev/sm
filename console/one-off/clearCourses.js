'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    sequelize = require('../../app/components/db'),
    SqlHelper = require('../modules/sqlHelper/SqlHelper');

const ACTUALIZE_TABLES = [
        'course_brand',
        'course_category',
        'course_type',
        'address',
        'page',
        'course'
    ],
    DELETE_QUERIES = [
        `DELETE FROM ${ACTUALIZE_TABLES[0]}`,
        `DELETE FROM ${ACTUALIZE_TABLES[1]}`,
        `DELETE FROM ${ACTUALIZE_TABLES[2]}`,
        `DELETE FROM ${ACTUALIZE_TABLES[3]} WHERE entity_type != 'school'`,
        `DELETE FROM ${ACTUALIZE_TABLES[4]} WHERE entity_type != 'school'`
    ];

module.exports = async(function() {
    await(DELETE_QUERIES.map(query =>
        sequelize.query(
            query, {
                type: sequelize.QueryTypes.DELETE
            }
        )
    ));
    await(ACTUALIZE_TABLES.map(tableName =>
        SqlHelper.actualizeSequence(tableName)
    ));
});

if (!module.parent) {
    module.exports();
}
