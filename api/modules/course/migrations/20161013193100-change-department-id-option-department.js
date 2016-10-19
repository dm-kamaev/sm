'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'course_option_course_department',
            'course_department_id', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'course_department',
                    key: 'id'
                },
                onDelete: 'cascade'
            }
        );
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'course_option_course_department',
            'course_department_id', {
                type: Sequelize.INTEGER
            }
        );
    })
};
