'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.renameColumn('address', 'school_id', 'entity_id'));
        return await(queryInterface.addColumn(
            'address',
            'entity_type',
            Sequelize.STRING
        ));
    }),
    down: async(function(queryInterface) {
        await(queryInterface.renameColumn('address', 'entity_id', 'school_id'));
        return await(queryInterface.removeColumn(
            'address',
            'entity_type'
        ));
    })
};
