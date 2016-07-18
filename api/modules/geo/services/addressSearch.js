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
 */
exports.update = async(function(id, data) {
    return models.AddressSearchData.update(data, {
        where: {
            id: id
        }
    });
});
