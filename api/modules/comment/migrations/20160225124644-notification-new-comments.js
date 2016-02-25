'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('comment', 'is_notice_send', {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('comment', 'is_notice_send');
    }
};