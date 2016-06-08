'use strict';

const entityType = require('../../api/modules/entity/enums/entityType');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'alias_backlog',
            'entity_type', {
                field: 'entity_type',
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'compositeIndex',
                validate: {
                    isIn: [entityType.toArray()]
                }
        });
    },
    down: function (queryInterface) {
        return queryInterface.changeColumn(
            'alias_backlog',
            'entity_type', {
                field: 'entity_type',
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'compositeIndex',
                validate: {
                    isIn: [entityType.toArray()]
                },
                defaultValue: entityType.SCHOOL
        });
    }
};
