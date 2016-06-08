'use strict';

const entityType = require('../../api/modules/entity/enums/entityType');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.renameTable('school_url', 'alias_backlog')
            .then(function() {
                return queryInterface.renameColumn(
                    'alias_backlog',
                    'school_id',
                    'entity_id'
                );
            }).then(function() {
                return queryInterface.changeColumn(
                    'alias_backlog',
                    'entity_id', {
                        type: Sequelize.INTEGER,
                        allowNull: false
                });
            }).then(function() {
                return queryInterface.renameColumn(
                    'alias_backlog',
                    'url',
                    'alias'
                );
            }).then(function() {
                return queryInterface.changeColumn(
                    'alias_backlog',
                    'alias', {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: 'compositeIndex'
                });
            }).then(function() {
                return queryInterface.addColumn(
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
                    }
                );
            });
    },
    down: function (queryInterface) {
        return queryInterface.dropColumn('alias_backlog', 'entity_type')
            .then(function() {
                return queryInterface.changeColumn(
                    'alias_backlog',
                    'alias', {
                        type: Sequelize.STRING
                    }
                );
            }).then(function() {
                return queryInterface.renameColumn(
                    'alias_backlog',
                    'alias',
                    'url'
                );
            }).then(function() {
                return queryInterface.changeColumn(
                    'alias_backlog',
                    'entity_id', {
                        type: Sequelize.INTEGER
                });
            }).then(function() {
                return queryInterface.renameColumn(
                    'alias_backlog',
                    'entity_id',
                    'school_id'
                );
            });
    }
};
