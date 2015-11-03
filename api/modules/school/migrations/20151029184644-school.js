'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('school', {
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
            type: DataType.STRING,
        },
        director: {
            type: DataType.STRING,
        },
        phones: {
            type: DataType.ARRAY(DataType.STRING),
        },
        site: {
            type: DataType.STRING,
        },
        addresses: {
            type: DataType.ARRAY(DataType.STRING),
        },
        coords: {
            type: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT)),
        },
        comment_group_id: {
            type: DataType.INTEGER
        }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('school');
  }
};
