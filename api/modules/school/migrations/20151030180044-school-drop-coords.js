'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('school', 'coords')

  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'school',
        'coords',
        {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT))
        }
    )
  }
};
