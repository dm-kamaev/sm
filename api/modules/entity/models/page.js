'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../../../app/components/db'),
      entityTypes = require('../enums/entityType');
console.log(entityTypes.toArray());

var Page = sequelize.define('Page', {
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
    views: Sequelize.INTEGER,
    description: Sequelize.STRING(300)
}, {
    underscored: true,
    tableName: 'page'
});

module.exports = Page;
