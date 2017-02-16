'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('page_meta', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            tabTitle: {
                type: Sequelize.STRING,
                field: 'tab_title'
            },
            seoDescription: {
                type: Sequelize.TEXT,
                field: 'seo_description'
            },
            openGraphTitle: {
                type: Sequelize.STRING,
                field: 'open_graph_title'
            },
            openGraphDescription: {
                type: Sequelize.TEXT,
                field: 'open_graph_description'
            },
            relapTag: {
                type: Sequelize.STRING,
                field: 'relap_tag'
            },
            shareImageUrl: {
                type: Sequelize.STRING,
                field: 'share_image_url'
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
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('page_meta');
    }
};
