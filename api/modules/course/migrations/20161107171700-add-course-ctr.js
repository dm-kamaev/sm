'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course', 'ctr', {
            type: Sequelize.DOUBLE
        });
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('course', 'ctr');
    })
};
