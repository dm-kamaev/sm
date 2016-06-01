'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('favorites', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: Sequelize.INTEGER,
            school_id: Sequelize.INTEGER
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('favorites');
    }
};
