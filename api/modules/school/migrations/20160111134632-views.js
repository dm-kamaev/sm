'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('school', 'views', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('school', 'views');
    }
};
