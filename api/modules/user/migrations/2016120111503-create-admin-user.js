'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('admin_user', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                unique: true,
                type: Sequelize.INTEGER,
            },
            accessAttributes: {
                type: Sequelize.JSONB,
            },
            'created_at': {
                allowNull: false,
                type: Sequelize.DATE
            },
            'updated_at': {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('admin_user');
    }
};
