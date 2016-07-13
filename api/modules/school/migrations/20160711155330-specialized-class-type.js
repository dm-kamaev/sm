'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'specialized_class_type',
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
        return queryInterface.dropTable('specialized_class_type');
    }
};
