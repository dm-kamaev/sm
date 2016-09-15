'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn('course_brand', 'name', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        });
    }),
    down: async(function(queryInterface) {
        return queryInterface.changeColumn('course_brand', 'name', {
            type: Sequelize.STRING,
            allowNull: false
        });
    })
};
