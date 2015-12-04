'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('olimp_result', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            school_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "school",
                    key: "id"
                }
            },
            subject_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "subject",
                    key: "id"
                }
            },
            type: {
                type: Sequelize.ENUM,
                values: ['всероссийская', 'московская'],
            },
            stage: {
                type: Sequelize.INTEGER
            },
            class: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM,
                values: ['победитель', 'призер']
            },
            year: {
                type: Sequelize.INTEGER
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('olimp_result');
    }
};
