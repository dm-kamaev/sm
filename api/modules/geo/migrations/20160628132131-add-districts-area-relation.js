'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.addColumn('area', 'district_id', {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'district',
                key: 'id'
            }
        }));
    }),
    down: async(function(queryInterface) {
        await(queryInterface.removeColumn('area', 'district_id'));
    })
};
