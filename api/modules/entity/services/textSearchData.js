'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var logger =
    require('../../../../app/components/logger/logger').getLogger('app');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityType = require('../enums/entityType');

var service = {
    name: 'textSearchData'
};

/**
 * @return {Array<Object>}
 */
service.getAll = async(function() {
    return await(models.TextSearchData.findAll({
        attributes: ['id', 'entity_id', 'entity_type', 'original_text']
    }));
});


module.exports = service;
