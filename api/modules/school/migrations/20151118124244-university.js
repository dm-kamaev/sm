'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('university', {
        id: {
            allowNull: false,
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
		name: {
			type: Sequelize.STRING
		}
   	});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('university');
  }
};
