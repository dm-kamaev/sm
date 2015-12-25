'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('metro', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        coords: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT)),
        },
        address_id: {
            type: Sequelize.INTEGER,
            references: {
                model:'address',
                key: 'id',
            }
        }
    });
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('metro');
  }
};
