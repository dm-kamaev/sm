'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('rating', {
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
        score: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        school_id: {
            type: Sequelize.INTEGER,
            references: {
                model:"school",
                key: "id",
            }
        },
        comment_id: {
            type: Sequelize.INTEGER,
            references: {
                model:"comment",
                key: "id",
            }
        }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('rating');
  }
};
