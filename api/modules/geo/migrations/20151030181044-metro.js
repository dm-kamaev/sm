'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('metro', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                unique: true
            },
            coords: {
                type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.FLOAT))
            },
            address_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'address',
                    key: 'id'
                }
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('metro');
    }
};
