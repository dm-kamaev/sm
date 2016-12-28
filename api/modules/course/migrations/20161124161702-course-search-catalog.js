'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_search_catalog', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE,
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('course_search_catalog');
    }
};
