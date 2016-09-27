'use strict';

const async = require('asyncawait/async');

const sequelize = require('../../app/components/db');
var squel = require('squel');

module.exports = {
    up: async(function() {
        var ids = [11, 13, 23, 25, 35, 37, 47, 49, 59, 61];

        return ids.map(id => deleteRecord(id));
    }),
    down: function() {
        return null;
    }
};

/**
 * Deletes row by id
 * @param {number} id
 * @return {string}
 */
var deleteRecord = async(function(id) {
    var sqlQuery = squel
        .delete()
        .from('seo_school_list')
        .where('id=' + id)
        .toString();

    return sequelize.query(
        sqlQuery,
        {
            type: sequelize.QueryTypes.DELETE
        }
    );
});
