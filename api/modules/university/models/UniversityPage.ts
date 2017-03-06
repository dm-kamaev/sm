const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface UniversityPageAttribute {
    id?: number;
    universityId?: number;
    pageId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UniversityPageInstance
    extends Sequelize.Instance<UniversityPageAttribute>,
            UniversityPageAttribute {}

interface UniversityPageModel
    extends Sequelize.Model<UniversityPageInstance, UniversityPageAttribute> {}

const UniversityPage: UniversityPageModel
    = sequelize.define('UniversityPage', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    universityId: {
        unique: 'compositeIndex',
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'university_id',
        references: {
            model: 'university',
            key: 'id'
        }
    },
    pageId: {
        unique: 'compositeIndex',
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
    tableName: 'university_page',
    classMethods: {
        associate: function(models) {

        }
    }
});

export {UniversityPage as Model};
