'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'department',
            'stage'
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'department',
            'stage',
            {type: Sequelize.STRING(50)}
        );
    }
};
