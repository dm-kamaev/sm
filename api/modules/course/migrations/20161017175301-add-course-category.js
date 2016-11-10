'use strict';

const async = require('asyncawait/async');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_category', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            },
            filters: Sequelize.ARRAY(Sequelize.STRING),
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at'
            }
        });
    }),
    down: async(function(queryInterface) {
        return queryInterface.dropTable('course_category');
    })
};
