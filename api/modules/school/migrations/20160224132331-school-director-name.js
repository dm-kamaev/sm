'use strict';
const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

var sequelize = require.main.require('../../../app/components/db');
var squel = require('squel');

module.exports = {
    up: async(function () {
        var sqlUpdate = squel.update()
            .table('school')
            .set('director', 'Рачевский Ефим Лазаревич')
            .where('id = ?', 32)
            .toString();
        await(sequelize.query(
            sqlUpdate,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }),
    down: function () {
        return null;
    }
};
