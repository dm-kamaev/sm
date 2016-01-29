'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('department', 'availability',
    {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropColumn(
        'department',
        'availability'
    )
  }
};