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
            type: Sequelize.STRING,
        },
        abbreviation: {
            type: Sequelize.STRING,
        },
        full_name: {
            type: Sequelize.STRING,
        },
        director: {
            type: Sequelize.STRING,
        },
        phones: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        },
        site: {
            type: Sequelize.STRING,
        },
        addresses: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        },
        coords: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT)),
        },
        goverment_key: {
          type: Sequelize.INTEGER,
            unique: true
        },
        comment_group_id: {
            type: Sequelize.INTEGER,
            references: {
                model:"comment_group",
                key: "id",
            }
        }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('school');
  }
};
