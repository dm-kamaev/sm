'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../../../app/components/db'),
      entityTypes = require('../enums/entityType');

var AliasBacklog = sequelize.define('AliasBacklog', {
    entityId: {
        field: 'entity_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entityType: {
        field: 'entity_type',
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex',
        validate: {
            isIn: [entityTypes.toArray()]
        }
    },
    alias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    }
}, {
    underscored: true,
    tableName: 'alias_backlog'
});

module.exports = AliasBacklog;
