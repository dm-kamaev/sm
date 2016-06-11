'use strict';
const await = require('asyncawait/await');
const async = require('asyncawait/async');

var sequelize = require.main.require('../../../app/components/db');
var squel = require('squel');

module.exports = {
    up: async(function() {
        await(deleteRecord(492, 'school'));
        await(deleteRecord(372, 'comment'));
        await(deleteRecord(620, 'school'));
    }),
    down: function() {
        return null;
    }
};

var deleteRecord = async(function(id, table) {
    var sqlQuery = squel
        .delete()
        .from(table)
        .where('id=' + id)
        .toString();

    return sequelize.query(
        sqlQuery,
        {
            type: sequelize.QueryTypes.DELETE
        }
    );
});

