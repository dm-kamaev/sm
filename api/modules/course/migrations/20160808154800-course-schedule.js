'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_schedule', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            courseOptionId: {
                type: Sequelize.INTEGER,
                field: 'course_option_id',
                references: {
                    model: 'course_option',
                    key: 'id'
                },
                onDelete: 'cascade'
            },
            startTime: {
                type: Sequelize.TIME,
                field: 'start_time'
            },
            endTime: {
                type: Sequelize.TIME,
                field: 'end_time'
            },
            day: Sequelize.INTEGER,
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at'
            }
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('course_schedule');
    }
};
