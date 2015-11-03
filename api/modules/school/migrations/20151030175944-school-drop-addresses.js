'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('school', 'addresses')

  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'school',
        'addresses',
        {
            type: Sequelize.ARRAY(Sequelize.STRING),
        }
    )
  }
};
