'use strict';
const await = require('asyncawait/await');
const async = require('asyncawait/async');
var sequelize = require.main.require('../../../app/components/db');
module.exports = {
    up: async(function() {
        var sqlString = 'DELETE FROM activity ' +
            'WHERE profile ILIKE \'%другое%\' ' +
            'AND TYPE ILIKE \'%другое%\'';
        await(sequelize.query(
            sqlString,
            {
                type: sequelize.QueryTypes.DELETE
            }
        ));
    }),
    down: function() {
        return null;
    }
};
