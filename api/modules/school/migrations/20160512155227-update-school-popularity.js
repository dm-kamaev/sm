'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const squel = require('squel');
const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function () {
        updatePopularity(471, 194);
        updatePopularity(69, 36);
    }),
    down: function () {
        return null;
    }
};

var updatePopularity = function(id, popularity) {
    var sqlUpdate = squel.update()
        .table('school')
        .set('views = ' + popularity)
        .where('id = ' + id)
        .toString();

    await(sequelize.query(
        sqlUpdate, {
            type: sequelize.QueryTypes.UPDATE
        }
    ));
};
