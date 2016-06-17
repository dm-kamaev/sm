'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

var sequelize = require.main.require('../../../app/components/db');
var squel = require('squel');

module.exports = {
    up: async(function() {
        var sqlUpdate = squel.update()
            .table('school')
            .set('education_interval', '{7, 8, 9, 10, 11}')
            .where('id = ?', 479)
            .toString();

        await(sequelize.query(
            sqlUpdate,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }),
    down: async(function() {
        var sqlUpdate = squel.update()
            .table('school')
            .set(
                'education_interval',
                '{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}'
            )
            .where('id = ?', 479)
            .toString();

        await(sequelize.query(
            sqlUpdate,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    })
};
