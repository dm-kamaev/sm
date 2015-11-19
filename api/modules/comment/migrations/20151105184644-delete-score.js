'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('comment', 'score');
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('comment', 'score', {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    });
  }
};
