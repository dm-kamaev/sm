'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn('user_data', 'user_id', {
            type: Sequelize.INTEGER
        });
        queryInterface.addColumn('user_data', 'key', {
            type: Sequelize.STRING
        });
    },
    down: function (queryInterface) {
        queryInterface.removeColumn('user_data', 'user_id');
        queryInterface.removeColumn('user_data', 'key');
    }
};
