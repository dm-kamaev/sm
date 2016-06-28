'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Sessions', {
            sid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            expires: Sequelize.DATE,
            data: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    down: function(queryInterface) {
        return queryInterface.dropTable('Sessions');
    }
};
