'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('comment', {
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
      text: {
        type: Sequelize.TEXT
      },
      user_type: {
        allowNull: false,
        type: DataType.ENUM('Parent','Graduate','Scholar'),
      },
      score: {
        allowNull: false,
        type: DataType.ARRAY(DataType.INTEGER)
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('comment');
  }
};
