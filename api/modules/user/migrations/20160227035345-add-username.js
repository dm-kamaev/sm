'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn('user_data', 'username', {
            type: Sequelize.STRING
        });
    },
    down: function (queryInterface) {
        queryInterface.removeColumn('user_data', 'username');
    }
};
