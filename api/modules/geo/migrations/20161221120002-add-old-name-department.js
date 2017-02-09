'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('department', 'old_name', {
            type: Sequelize.STRING,
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('department', 'old_name');
    }
};
