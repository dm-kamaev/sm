'use strict';

const await = require('asyncawait/await'),
    async = require('asyncawait/async'),
    path = require('path'),
    squel = require('squel'),
    sequelize = require('../../app/components/db');

const Archiver = require('../../console/modules/modelArchiver/Archiver.js');

module.exports = {
    up: async(function() {
        var dir = path.join(
                __dirname,
                '../../api/modules/geo/migrations'
            ),
            file = '20160628132136-district-area-relation-data.tar.gz',
            filePath = path.join(dir, file),
            archiver = new Archiver(filePath),
            jsonDistricts = archiver.decompress();
        var districts = JSON.parse(jsonDistricts);

        districts.forEach(district => {
            var areas = district.areas,
                districtId = await(getDistrictIdByName(district.name));
            areas.forEach(areaName => {
                await(fillAreaDepartment(areaName, districtId));
            });
        });
    }),
    down: async(function() {
        return null;
    })
};

/**
 * Fill FK of department in area table
 * @param {string} areaName
 * @param {number} districtId
 */
var fillAreaDepartment = function(areaName, districtId) {
    var query = squel.update()
        .table('area')
        .set('district_id', districtId)
        .where('name = \'' + areaName + '\'')
        .toString();

    await(sequelize.query(
        query,
        {
            type: sequelize.QueryTypes.UPDATE
        }
    ));
};

/**
 * Return district id by given name
 * @param {string} name
 * @return {number}
 */
var getDistrictIdByName = function(name) {
    var query = squel.select()
        .from('district')
        .field('id')
        .where('name = \'' + name + '\'')
        .limit(1)
        .toString();

    var districts = await(sequelize.query(
        query,
        {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return districts[0].id;
};
