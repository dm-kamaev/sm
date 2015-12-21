'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('activity', {
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
            direction: {
                type: Sequelize.STRING,
            },
            profile: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            school_id: {
                type: Sequelize.INTEGER,
                references: {
                    model:"school",
                    key: "id",
                }
            },
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('activity');
    }
};
