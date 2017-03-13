'use strict';

const DataType = require('sequelize');

import * as Sequelize from 'sequelize/v3';

const sequelize = require('../../../../app/components/db'),
    entityTypes = require('../enums/entityType');

import {PageIntstance, PageAttribute} from '../types/page';

interface PageModel extends Sequelize.Model<PageIntstance, PageAttribute> {}

const Page = sequelize.define('Page', {
    entityId: {
        field: 'entity_id',
        type: DataType.INTEGER,
        allowNull: false
    },
    entityType: {
        field: 'entity_type',
        type: DataType.STRING,
        unique: 'compositeIndex',
        validate: {
            isIn: [entityTypes.toArray()]
        }
    },
    alias: {
        type: DataType.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    views: DataType.INTEGER,
    description: DataType.STRING(300)
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

export {Page as Model};
