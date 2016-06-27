'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.renameTable('search_data', 'school_search_data');
    },
    down: function(queryInterface) {
        return queryInterface.renameTable('search_data', 'school_search_data');
    }
};
