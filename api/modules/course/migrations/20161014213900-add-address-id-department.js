'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'course_department',
            'address_id', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'address',
                    key: 'id'
                },
                onDelete: 'cascade'
            }
        );
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('course_department', 'address_id');
    })
};
