'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('city', {
        id: {
            allowNull: false,
            autoIncrement: true,
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
    }).then(()=> { //TODO: make this work
            queryInterface.insert(null,'city',{
                name: 'Москва'
            })
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('city');
  }
};
