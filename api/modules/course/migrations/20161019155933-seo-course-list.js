'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('seo_course_list', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            tabTitle: {
                type: Sequelize.STRING,
                field: 'tab_title'
            },
            metaDescription: {
                type: Sequelize.STRING,
                field: 'meta_description'
            },
            categoryId: {
                type: Sequelize.INTEGER,
                field: 'category_id',
                references: {
                    model: 'course_category',
                    key: 'id'
                },
                onDelete: 'cascade'
            },
            openGraphTitle: {
                type: Sequelize.STRING,
                field: 'open_graph_title'
            },
            openGraphDescription: {
                type: Sequelize.STRING,
                field: 'open_graph_description'
            },
            listTitle: {
                type: Sequelize.STRING,
                field: 'list_title'
            },
            text: Sequelize.ARRAY(Sequelize.STRING),
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
        return queryInterface.dropTable('seo_course_list');
    }
};
