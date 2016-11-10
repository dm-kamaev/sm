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
 * @param {{
 *     entityId: number,
 *     entityType: string,
 *     type: string,
 *     addressId: number
 * }} where
 * @param {Object} data
 * @return {AddressSearch}
 */
exports.updateByEntity = async(function(where, data) {
    return models.AddressSearchData.update(data, {
        where: where
    });
});

/**
 * @param {{
 *     entityId: number,
 *     entityType: string,
 *     type: string,
 *     addressId: number
 * }} where
 * @return {AddressSearch}
 */
exports.deleteByEntity = async(function(where) {
    return models.AddressSearchData.destroy({where: where});
});
