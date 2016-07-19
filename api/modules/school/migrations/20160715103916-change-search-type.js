'use strict';

var searchType = require('../../api/modules/school/enums/searchType');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'school_search_data',
            'type',
            {
                type: Sequelize.STRING
            }
        );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'school_search_data',
            'type',
            {
                type: {
                    type: Sequelize.ENUM,
                    values: searchType.toArray()
                }
            }
        );
    }
};
