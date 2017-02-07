'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('ege_result', 'passed_count', {
            type: Sequelize.INTEGER,
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('ege_result', 'passed_count');
    }
};
