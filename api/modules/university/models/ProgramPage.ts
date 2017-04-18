const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface ProgramPageAttribute {
    id?: number;
    programId?: number;
    pageId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProgramPageInstance
    extends Sequelize.Instance<ProgramPageAttribute>, ProgramPageAttribute {}

interface ProgramPageModel
    extends Sequelize.Model<ProgramPageInstance, ProgramPageAttribute> {}

const ProgramPage: ProgramPageModel = sequelize.define('ProgramPage', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    programId: {
        unique: true,
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'program_id',
        references: {
            model: 'program',
            key: 'id'
        }
    },
    pageId: {
        unique: true,
        allowNull: false,
        onUpdate: 'cascade',
        type: DataType.INTEGER,
        field: 'page_id',
        references: {
            model: 'page',
            key: 'id'
        }
    },
    createdAt: {
        field: 'created_at',
        type: DataType.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataType.DATE
    }
}, {
    underscored: true,
    tableName: 'program_page',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Page, {
                foreignKey: 'page_id',
                as: 'page'
            });
        }
    }
});

export {ProgramPage as Model};
