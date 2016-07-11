'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('address_search_data', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            'address_id': {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'address',
                    key: 'id'
                }
            },
            'entity_id': Sequelize.INTEGER,
            'entity_type': Sequelize.STRING,
            values: Sequelize.ARRAY(Sequelize.INTEGER),
            type: Sequelize.STRING,
            'created_at': Sequelize.DATE,
            'updated_at': Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('address_search_data');
    }
};
