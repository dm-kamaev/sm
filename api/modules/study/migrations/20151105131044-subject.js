'use strict';


module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('subject', {
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
            display_name: Sequelize.STRING,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('subject');
    }
};
