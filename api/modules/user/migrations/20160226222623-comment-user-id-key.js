'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn('user_data', 'user_id', {
            type: Sequelize.INTEGER
        });
        queryInterface.addColumn('user_data', 'key', {
            type: Sequelize.STRING
        });
    },
    down: function(queryInterface) {
        queryInterface.removeColumn('user_data', 'user_id');
        queryInterface.removeColumn('user_data', 'key');
    }
};
