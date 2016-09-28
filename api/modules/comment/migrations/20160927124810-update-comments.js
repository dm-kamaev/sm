'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('comment', 'source', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'User'
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('comment', 'source');
    }
};
