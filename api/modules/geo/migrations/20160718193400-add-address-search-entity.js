'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.addColumn('address_search_data', 'entity_id', {
            type: Sequelize.INTEGER
        }));
        return await(queryInterface.addColumn(
            'address_search_data',
            'entity_type',
            {
                type: Sequelize.STRING
            }
        ));
    }),
    down: async(function(queryInterface) {
        await(queryInterface.removeColumn('address_search_data', 'entity_id'));
        return await(queryInterface.removeColumn(
            'address_search_data',
            'entity_type'
        ));
    })
};
