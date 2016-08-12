'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('course_brand', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('course_brand');
    }
};
