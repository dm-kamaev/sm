'use strict';
var enums = require('../enums');
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
        type: Sequelize.ENUM,//('Parent','Graduate','Scholar'),
        values: enums.posterType.toArray() 
      },
      score: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      comment_group_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"comment_group",
          key: "id",
        }
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('comment');
  }
};
