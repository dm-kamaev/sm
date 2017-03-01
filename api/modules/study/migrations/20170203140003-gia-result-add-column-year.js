'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('gia_result', 'year', {
            type: Sequelize.INTEGER,
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('gia_result', 'year');
    }
};
