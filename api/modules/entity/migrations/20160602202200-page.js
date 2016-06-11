'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('page', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            entity_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            entity_type: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'compositeIndex'
            },
            alias: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'compositeIndex'
            },
            views: Sequelize.INTEGER,
            description: Sequelize.STRING(300),
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('page');
    }
};
