'use strict';

const async = require('asyncawait/async');

const departmentStage = require('../../api/modules/geo/enums/departmentStage');

module.exports = {
    up: async(function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'department',
            'stage',
            {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        );
    }),
    down: function(queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'department',
            'stage',
            {
                type: Sequelize.ENUM,
                values: departmentStage.toArray(),
                allowNull: false
            }
        );
    }
};
