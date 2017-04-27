const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

import {
    ProgramPageMetaInformationAttribute,
    ProgramPageMetaInformationInstance,
} from '../types/programPageMetaInformation';


interface ProgramPageMetaInformationModel
    extends Sequelize.Model<
    ProgramPageMetaInformationInstance,
    ProgramPageMetaInformationAttribute
> {}

const ProgramPageMetaInformation: ProgramPageMetaInformationModel
    = sequelize.define('ProgramPageMetaInformation', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    programId: {
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'program_id',
        references: {
            model: 'program',
            key: 'id'
        }
    },
    keywords: DataType.TEXT,
    tabTitle: {
        field: 'tab_title',
        type: DataType.STRING
    },
    seoDescription: {
        field: 'seo_description',
        type: DataType.TEXT
    },
    openGraphDescription: {
        field: 'open_graph_description',
        type: DataType.TEXT
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
    tableName: 'program_page_meta_information',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Program, {
                foreignKey: 'program_id',
                as: 'program'
            });
        }
    }
});

export {ProgramPageMetaInformation as Model};
