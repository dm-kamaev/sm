var async = require('asyncawait/async');
var models = require('../../../../app/components/models').all;

exports.name = 'addressSearch';

/**
 * @param {Object} data
 */
exports.create = async(function(data) {
    return models.AddressSearchData.create(data);
});

/**
 * @param {number} id - address search data id
 * @param {Object} data
 * @return {AddressSearch}
 */
exports.update = async(function(id, data) {
    return models.AddressSearchData.update(data, {
        where: {
            id: id
        }
    });
});

/**
 * @param {number} addressId
 * @param {string} type
 * @param {Object} data
 * @return {AddressSearch}
 */
exports.updateBySearchData = async(function(addressId, type, data) {
    return models.AddressSearchData.update(data, {
        where: {
            addressId: addressId,
            type: type
        }
    });
});
