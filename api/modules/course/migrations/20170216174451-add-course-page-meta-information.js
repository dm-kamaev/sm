'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_page_meta_information', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            courseId: {
                type: Sequelize.INTEGER,
                field: 'course_id',
                unique: true,
                references: {
                    model: 'course',
                    key: 'id'
                }
            },
            pageMetaInformationId: {
                type: Sequelize.INTEGER,
                field: 'page_meta_information_id',
                unique: true,
                references: {
                    model: 'page_meta_information',
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
        return queryInterface.dropTable('course_page_meta_information');
    }
};
