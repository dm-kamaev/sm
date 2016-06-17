'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('additional_education', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            category: Sequelize.STRING,
            sphere: Sequelize.STRING,
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            phone: Sequelize.STRING,
            contact: Sequelize.STRING,
            requirements: Sequelize.TEXT,
            'raw_data': Sequelize.TEXT,
            'school_id': {
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                references: {
                    model: 'school',
                    key: 'id'
                }
            },
            'created_at': {
                allowNull: false,
                type: Sequelize.DATE
            },
            'updated_at': {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('additional_education');
    }
};
