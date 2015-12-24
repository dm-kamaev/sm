'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropAllEnums();
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.dropAllEnums();
  }
};
