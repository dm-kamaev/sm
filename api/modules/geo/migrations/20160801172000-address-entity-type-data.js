'use strict';

var async = require('asyncawait/async'),
    await = require('asyncawait/await');
var squel = require('squel').useFlavour('postgres');

var sequelize = require('../../app/components/db'),
    entityType = require('../../api/modules/entity/enums/entityType');

module.exports = {
    up: async(function() {
        var query = squel.update()
            .table('address')
            .set('entity_type', entityType.SCHOOL)
            .toString();

        return await(sequelize.query(
            query,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }),
    down: function() {
        return null;
    }
};
