'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.renameColumn(
            'favorite',
            'item_id',
            'entity_id'
        ));
        return queryInterface.addColumn('favorite', 'entity_type', {
            type: Sequelize.STRING
        });
    }),
    down: async(function(queryInterface) {
        await(queryInterface.renameColumn(
            'favorite',
            'entity_id',
            'item_id'
        ));
        return queryInterface.removeColumn('favorite', 'entity_type');
    })
};
