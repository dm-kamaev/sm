'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');

var squel = require('squel');

module.exports = {
    up: async(function (queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'department',
            'stage',
            {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        );
    }),
    down: function () {
        return queryInterface.changeColumn(
            'department',
            'stage',
            {
                type: DataType.ENUM,
                values: departmentStage.toArray(),
                allowNull: false
            }
        );
    }
};
