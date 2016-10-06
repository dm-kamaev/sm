'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course_brand', 'description', {
            type: Sequelize.TEXT
        });
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('course_brand', 'description');
    })
};
