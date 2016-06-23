'use strict';

const async = require('asyncawait/async');
const models = require('../../../../app/components/models').all;

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

module.exports = service;
