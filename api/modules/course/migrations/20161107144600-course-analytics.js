'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_analytics', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            courseId: {
                type: Sequelize.INTEGER,
                field: 'course_id',
                references: {
                    model: 'course',
                    key: 'id'
                },
                onDelete: 'cascade'
            },
            ctr: Sequelize.DOUBLE,
            clicks: Sequelize.INTEGER,
            views: Sequelize.INTEGER,
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
        return queryInterface.dropTable('course_analytics');
    }
};
