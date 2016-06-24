'use strict';

var colors = require('colors');

var searchType = require('../../api/modules/school/enums/searchType');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.renameTable('search_data', 'school_search_data');
    },
    down: function(queryInterface) {
        return queryInterface.renameTable('search_data', 'school_search_data');
    }
};
