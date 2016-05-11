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
        total_score: {
            type: Sequelize.FLOAT
        },
        school_id: {
            onDelete: 'cascade',
            type: Sequelize.INTEGER,
            references: {
                model:'school',
                key: 'id',
            }
        },

    });
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('rating');
  }
};
