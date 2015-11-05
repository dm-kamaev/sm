'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('comment', 'score');
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.createColumn('comment', 'score', {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    });
  }
};
