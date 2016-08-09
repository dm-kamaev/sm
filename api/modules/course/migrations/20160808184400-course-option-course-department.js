'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_option_course_department', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            courseOptionId: {
                type: Sequelize.INTEGER,
                field: 'course_option_id'
            },
            courseDepartmentId: {
                type: Sequelize.INTEGER,
                field: 'course_department_id'
            },
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
        return queryInterface.dropTable('course_option_course_department');
    }
};
