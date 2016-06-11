'use strict';
const departmentStage = require('../../api/modules/geo/enums/departmentStage');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('department', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: Sequelize.STRING,
            stage: {
                type: Sequelize.ENUM,
                values: departmentStage.toArray()
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('department');
    }
};
