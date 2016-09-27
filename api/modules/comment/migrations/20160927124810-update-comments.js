'use strict';

var sourceType = require('../enums/sourceType');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('comment', 'source', {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: 'User',
            field: 'source',
            validate: {
                isIn: sourceType
            }
        });
    },
    down: function(queryInterface) {
        return queryInterface.removeColumn('comment', 'source');
    }
}
