'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('ege_result', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                year: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                result: {
                    type: Sequelize.FLOAT,
                    allowNull: false
                },
                school_id: {
                    onDelete: 'cascade',
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'school',
                        key: 'id'
                    }
                },
                subject_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'subject',
                        key: 'id'
                    }
                },
                created_at: Sequelize.DATE,
                updated_at: Sequelize.DATE
            });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('ege_result');
    }
};
