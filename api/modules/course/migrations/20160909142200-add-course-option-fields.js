'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        await(queryInterface.addColumn('course_option', 'name', {
            type: Sequelize.STRING
        }));
        await(queryInterface.addColumn('course_option', 'description', {
            type: Sequelize.STRING
        }));
        await(queryInterface.addColumn('course_option', 'total_cost', {
            type: Sequelize.INTEGER
        }));
        return queryInterface.addColumn('course_option', 'current_group_size', {
            type: Sequelize.INTEGER
        });
    }),
    down: async(function(queryInterface) {
        await(queryInterface.removeColumn('course_option', 'name'));
        await(queryInterface.removeColumn('course_option', 'description'));
        await(queryInterface.removeColumn('course_option', 'total_cost'));
        return queryInterface.removeColumn(
            'course_option',
            'current_group_size'
        );
    })
};
