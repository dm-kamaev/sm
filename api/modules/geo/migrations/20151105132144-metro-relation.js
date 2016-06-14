'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('address_metro', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            'address_id': {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'address',
                    key: 'id'
                }
            },
            'metro_id': {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'metro',
                    key: 'id'
                }
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('address_metro');
    }
};
