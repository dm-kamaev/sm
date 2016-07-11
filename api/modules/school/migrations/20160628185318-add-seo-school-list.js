'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'seo_school_list',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                'seo_title': Sequelize.STRING,
                'seo_description': Sequelize.STRING,
                'title': Sequelize.STRING,
                'text': {
                    type: Sequelize.ARRAY(Sequelize.TEXT)
                },
                'search_parameters': {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                'list_type': {
                    type: Sequelize.STRING
                },
                'geo_type': {
                    type: Sequelize.STRING
                },
                'created_at': Sequelize.DATE,
                'updated_at': Sequelize.DATE
            }
        );
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('seo_school_list');
    }
};
