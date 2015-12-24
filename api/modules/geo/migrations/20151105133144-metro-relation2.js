'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'metro',
          'address_id'
      )
  },
    down: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('metro', 'address_id',
            {
                type: Sequelize.INTEGER,
                references: {
                    model:'address',
                    key: 'id',
                }
            });
    }
};
