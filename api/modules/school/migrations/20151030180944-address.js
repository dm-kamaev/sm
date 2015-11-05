'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('address', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING,
        },
        coords: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT)),
        },
        school_id: {
            type: Sequelize.INTEGER,
            references: {
                model:"school",
                key: "id",
            }
        }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('address');
  }
};
