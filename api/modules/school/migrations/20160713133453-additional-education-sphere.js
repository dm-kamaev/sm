'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'additional_education_sphere',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: Sequelize.STRING,
                popularity: Sequelize.INTEGER,
                'created_at': Sequelize.DATE,
                'updated_at': Sequelize.DATE
            }
        );
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('additional_education_sphere');
    }
};

