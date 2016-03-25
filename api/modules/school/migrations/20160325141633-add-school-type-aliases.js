'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('school_type_filter', 'alias', {
            type: Sequelize.STRING
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('school_type_filter', 'alias');
    }
};
