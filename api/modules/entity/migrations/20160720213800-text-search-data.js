'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('text_search_data', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            'entity_id': {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            'entity_type': {
                type: Sequelize.STRING,
                allowNull: false
            },
            'formatted_text': Sequelize.STRING,
            'original_text': Sequelize.STRING,
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('text_search_data');
    }
};
