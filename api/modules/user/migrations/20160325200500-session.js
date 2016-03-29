'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Sessions', {
            sid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            expires: Sequelize.DATE,
            data: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('Sessions');
    }
};
