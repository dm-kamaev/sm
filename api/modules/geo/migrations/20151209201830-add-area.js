'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('area', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                name: {
                    type: Sequelize.STRING
                }
            }).then(() => {
                queryInterface.addColumn('address', 'area_id', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'area',
                        key: 'id'
                    }
                });
            });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable(
            'area'
        ).then( () => {
            queryInterface.removeColumn('address', 'area_id')
        });
    }
};
