'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

var sequelize = require.main.require('../../../app/components/db');
var squel = require('squel');

module.exports = {
    up: async(function() {
        var wrongAreaId = getAreaId('Хорошейвский'),
            correctAreaId = getAreaId('Хорошёвский');

        updateAddressesAreaId(wrongAreaId, correctAreaId);
        deleteArea(wrongAreaId);
    }),
    down: function() {
        return null;
    }
};

var getAreaId = function(name) {
    var sqlSelect = squel.select()
        .field('id')
        .from('area')
        .where('name = ?', name)
        .toString();

    var area = await(sequelize.query(
        sqlSelect,
        {
            type: sequelize.QueryTypes.SELECT
        }
    ));
    return area[0].id;
};

var updateAddressesAreaId = function(fromAreaId, toAreaId) {
    var sqlUpdate = squel.update()
        .table('address')
        .set('area_id = ' + toAreaId)
        .where('area_id = ' + fromAreaId)
        .toString();

    await(sequelize.query(
        sqlUpdate,
        {
            type: sequelize.QueryTypes.UPDATE
        }
    ));
};

var deleteArea = function(areaId) {
    var sqlDelete = squel.delete()
        .from('area')
        .where('id = ' + areaId)
        .toString();

    await(sequelize.query(
        sqlDelete,
        {
            type: sequelize.QueryTypes.DELETE
        }
    ));
};
