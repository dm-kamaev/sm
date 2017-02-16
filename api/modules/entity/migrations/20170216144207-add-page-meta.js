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
            'tab_title': Sequelize.STRING,
            'seo_description': Sequelize.TEXT,
            'open_graph_title': Sequelize.STRING,
            'open_graph_description': Sequelize.STRING,
            'relap_tag': Sequelize.STRING,
            'share_image_url': Sequelize.STRING,
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('page_meta');
    }
};
