'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course_option', 'length_weeks', {
            type: Sequelize.INTEGER
        });
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('course_option', 'length_weeks');
    })
};
