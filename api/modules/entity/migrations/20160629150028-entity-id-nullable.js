'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'page',
            'entity_id',
            {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'page',
            'entity_id',
            {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        );
    }
};
