'use strict';

const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface AdditionalEducationSphereAttribute {
    id: number;
    name: string;
    popularity: number;
}

export interface AdditionalEducationSphereInstance
    extends
    Sequelize.Instance<AdditionalEducationSphereAttribute>,
    AdditionalEducationSphereAttribute {}

interface AdditionalEducationSphereModel
    extends
    Sequelize.Model<
        AdditionalEducationSphereInstance,
        AdditionalEducationSphereAttribute
    > {}


const AdditionalEducationSphere: AdditionalEducationSphereModel = db.define(
    'AdditionalEducationSphere',
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
        tableName: 'additional_education_sphere',
        classMethods: {
            associate: function(models) {
                AdditionalEducationSphere.hasMany(
                    models.AdditionalEducation,
                    {
                        foreignKey: 'sphere_id',
                        onDelete: 'cascade'
                    }
                );
            }
        }
    }
);

export {AdditionalEducationSphere as Model};

