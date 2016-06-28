'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    geoView = require('../views/geoView');

var service = {
    name: 'district'
};


/**
 * Create
 * @param {{
 *     name: string,
 *     centerCoords: Array<number>
 * }} districtData
 */
service.create = async(function(districtData) {
    return models.District.create(districtData);
});


/**
 * Return all districts with areas included
 * @return {Array<models.District>}
 */
service.getAllWithAreas = async(function() {
   return await(models.District.findAll({
       include: [{
           model: models.Area,
           as: 'areas'
       }]
   }));
});


/**
 * Return coordinates of center of district with given id
 * @param {number} districtId
 * @return {Array<number>}
 */
service.getCenterCoords = async(function(districtId) {
    var district = await(models.District.findOne({
        attributes: ['centerCoords'],
        where: {
            id: districtId
        }
    }));

    return geoView.coordinatesDefault(district.centerCoords);
});

module.exports = service;
