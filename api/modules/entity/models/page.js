'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../../../app/components/db'),
    entityTypes = require('../enums/entityType');

var Page = sequelize.define('Page', {
    entityId: {
        field: 'entity_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entityType: {
        field: 'entity_type',
        type: Sequelize.STRING,
        unique: 'compositeIndex',
        validate: {
            isIn: [entityTypes.toArray()]
        }
    },
    alias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    views: Sequelize.INTEGER,
    description: Sequelize.STRING(300)
}, {
    underscored: true,
    tableName: 'page',
    classMethods: {
        associate: function(models) {
            this.belongsToMany(models.University, {
                as: 'university',
                through: 'university_page',
                foreignKey: 'page_id',
            });
            this.belongsToMany(models.Program, {
                as: 'program',
                through: 'program_page',
                foreignKey: 'page_id',
            });
        }
    }
});

module.exports = Page;
