'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('subject', 'alias', {
            type: Sequelize.STRING
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('subject', 'alias');
    }
};
