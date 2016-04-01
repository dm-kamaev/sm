'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('comment', 'rating_id', {
      type: Sequelize.INTEGER,
      references: {
        model:'rating',
        key: 'id',
      }
    });
  },
  down: function (queryInterface) {
    return queryInterface.removeColumn('comment', 'rating_id');
  }
};

