'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn('user_data', 'username', {
            type: Sequelize.STRING
        });
    },
    down: function(queryInterface) {
        queryInterface.removeColumn('user_data', 'username');
    }
};
