const DataType = require('sequelize');
const db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

import {SpecializedClassTypeInstance} from './specializedClassType';

export interface SchoolSpecializedClassAttribute {
    id?: number;
    schoolId?: number;
    specializedClassTypeId?: number;
    class?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    specializedClassType?: SpecializedClassTypeInstance;
}

export interface SchoolSpecializedClassInstance
    extends Sequelize.Instance<SchoolSpecializedClassAttribute>,
        SchoolSpecializedClassAttribute {}

interface SchoolSpecializedClassModel
    extends Sequelize.Model<SchoolSpecializedClassInstance,
        SchoolSpecializedClassAttribute> {}

const Model: SchoolSpecializedClassModel = db.define('SchoolSpecializedClass', {
    id: {
        field: 'id',
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    schoolId: {
        field: 'school_id',
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'school',
            key: 'id'
        }
    },
    specializedClassTypeId: {
        field: 'specialized_class_type_id',
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'specialized_class_type',
            key: 'id'
        }
    },
    class: DataType.INTEGER,
    createdAt: {
        field: 'created_at',
        type: DataType.INTEGER
    },
    updatedAt: {
        field: 'updated_at',
        type: DataType.INTEGER
    }
}, {
    underscored: true,
    tableName: 'school_specialized_class',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.SpecializedClassType, {
                foreignKey: 'specialized_class_type_id',
                as: 'specializedClassType'
            });
            this.belongsTo(models.School, {
                foreignKey: 'school_id',
                as: 'school'
            });
        }
    }
});

export {Model};
