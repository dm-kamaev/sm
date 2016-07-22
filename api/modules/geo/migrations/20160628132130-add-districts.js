'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.createTable('district', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            'center_coords': {
                type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT))
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        }));
    }),
    down: async(function(queryInterface) {
        await(queryInterface.dropTable('district'));
    })
};
