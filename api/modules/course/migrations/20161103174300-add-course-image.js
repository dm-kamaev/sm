'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.addColumn('course', 'image_url', {
            type: Sequelize.STRING(511)
        });
    }),
    down: async(function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('course', 'image_url');
    })
};
