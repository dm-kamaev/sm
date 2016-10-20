'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'course_option_course_department',
            'course_option_id', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'course_option',
                    key: 'id'
                },
                onDelete: 'cascade'
            }
        );
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'course_option_course_department',
            'course_option_id', {
                type: Sequelize.INTEGER
            }
        );
    })
};
