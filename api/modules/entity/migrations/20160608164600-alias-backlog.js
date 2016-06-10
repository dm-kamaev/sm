'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('alias_backlog', {
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
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('alias_backlog');
    }
};
