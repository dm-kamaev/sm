'use strict';

const DataType = require('sequelize');
const db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface SpecializedClassTypeAttribute {
    id?: number;
    name?: string;
    popularity?: number;
}

export interface SpecializedClassTypeInstance
    extends Sequelize.Instance<SpecializedClassTypeAttribute>,
            SpecializedClassTypeAttribute {}

interface SpecializedClassTypeModel
    extends Sequelize.Model<
        SpecializedClassTypeInstance, SpecializedClassTypeAttribute
    > {}

// const SpecializedClassType = db.define(
const SpecializedClassType: SpecializedClassTypeModel = db.define(
    'SpecializedClassType',
    {
        id: {
            field: 'id',
            type: DataType.INTEGER,
            unique: true,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataType.STRING,
        popularity: DataType.INTEGER
    },
    {
        underscored: true,
        tableName: 'specialized_class_type'
    }
);

// export default SpecializedClassType;
// export default Model;
export { SpecializedClassType as Model};
