'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('comment', 'is_notice_send', {
            type: Sequelize.BOOLEAN
        });
    },
    down: function (queryInterface) {
        return queryInterface.removeColumn('comment', 'is_notice_send');
    }
};