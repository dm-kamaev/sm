'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course_option', 'open_schedule', {
            type: Sequelize.BOOLEAN
        });
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('course_option', 'open_schedule');
    })
};
