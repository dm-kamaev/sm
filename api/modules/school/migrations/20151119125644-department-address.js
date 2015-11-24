'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('department_address', {
        address_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "address",
                key: "id"
            }
        },
        department_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "department",
                key: "id"
            }
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('department_address');
  }
};
