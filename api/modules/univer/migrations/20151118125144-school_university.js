'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('school_university', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            'created_at': {
                allowNull: false,
                type: Sequelize.DATE
            },
            'updated_at': {
                allowNull: false,
                type: Sequelize.DATE
            },
            'school_id': {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                references: {
                    model: 'school',
                    key: 'id'
                }
            },
            'university_id': {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'university',
                    key: 'id'
                }
            },
            'ppl_count': {
                type: Sequelize.INTEGER
            },
            year: {
                type: Sequelize.INTEGER
            }
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('school_university');
    }
};
