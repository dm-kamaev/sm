'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_page_meta', {
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
                }
            },
            pageMetaId: {
                type: Sequelize.INTEGER,
                field: 'page_meta_id',
                references: {
                    model: 'page_meta',
                    key: 'id'
                },
                onDelete: 'cascade'
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
        return queryInterface.dropTable('course_page_meta');
    }
};
