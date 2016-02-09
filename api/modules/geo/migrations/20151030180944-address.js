'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('address', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                },
                coords: {
                    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT))
                },
                school_id: {
                    type: Sequelize.INTEGER,
                    onDelete: 'cascade',
                    references: {
                        model: 'school',
                        key: 'id'
                    }
                },
                area_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'area',
                        key: 'id'
                    }
                },
                created_at: Sequelize.DATE,
                updated_at: Sequelize.DATE
            });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('address');
    }
};
