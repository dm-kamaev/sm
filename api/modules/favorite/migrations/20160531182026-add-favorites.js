'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('favorite', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: Sequelize.INTEGER,
            item_id: {
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                references: {
                    model: 'school',
                    key: 'id'
                }
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('favorite');
    }
};
