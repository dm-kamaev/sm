'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
var sequelize = require.main.require('../../../app/components/db');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        var sqlString = 'UPDATE address ' +
            'SET area_id = 47 ' +
            'WHERE id IN (1160, 1330); ' +
            'UPDATE address ' +
            'SET area_id = 37 ' +
            'WHERE id IN (1733, 3831); ' +
            'UPDATE address ' +
            'SET area_id = 42 ' +
            'WHERE id IN (2067, 2696); ' +
            'UPDATE address ' +
            'SET area_id = 16 ' +
            'WHERE id = 3574;';
        await(sequelize.query(
            sqlString,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }),
    down: async(function(queryInterface) {
        return null;
    })
};
