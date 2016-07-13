/**
 * @fileOverview Services to operate with specialized classes types
 */

'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

var service = {
    name: 'specializedClassType'
};

/**
 * Create one scpecialized class type with given data and return it
 * @param {{
 *     name: (string|undefined),
 *     popularity: (number|undefined)
 * }} data
 * @return {models.SpecializedClassType}
 */
service.create = async(function(data) {
    return await(models.SpecializedClassType.create(data));
});

module.exports = service;

