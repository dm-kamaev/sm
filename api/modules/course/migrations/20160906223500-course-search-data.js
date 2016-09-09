'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_search_data', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            courseId: {
                type: Sequelize.INTEGER,
                field: 'course_id'
            },
            values: Sequelize.ARRAY(Sequelize.INTEGER),
            type: Sequelize.STRING,
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
        return queryInterface.dropTable('course_search_data');
    }
};
