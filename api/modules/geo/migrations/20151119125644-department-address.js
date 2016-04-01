'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('department_address', {
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
                model: 'address',
                key: 'id'
            }
        },
        department_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'department',
                key: 'id'
            }
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('department_address');
  }
};
