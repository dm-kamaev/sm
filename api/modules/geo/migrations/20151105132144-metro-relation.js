'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('address_metro', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        address_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model:'address',
                key: 'id',
            }
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        metro_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model:'metro',
                key: 'id',
            }
        }
    });
  },
    down: function (queryInterface) {
        return queryInterface.dropTable('address_metro');
    }
};
