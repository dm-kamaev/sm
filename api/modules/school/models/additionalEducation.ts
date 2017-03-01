const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface AdditionalEducationAttribute {
    id?: number;
    sphereId?: number;
    schoolId?: number;
    category?: string;
    name?: string;
    phone?: string;
    contact?: string;
    requirements?: string;
    rawData?: string;
}

export interface AdditionalEducationInstance
    extends Sequelize.Instance<AdditionalEducationAttribute>,
            AdditionalEducationAttribute {}

interface AdditionalEducationModel
    extends
    Sequelize.Model<AdditionalEducationInstance,
    AdditionalEducationAttribute> {}

const AdditionalEducation: AdditionalEducationModel = db.define(
    'AdditionalEducation', {
    sphereId: {
        type: DataType.INTEGER,
        field: 'sphere_id'
    },
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    category: DataType.STRING,
    name: DataType.STRING,
    description: DataType.TEXT,
    phone: DataType.STRING,
    contact: DataType.STRING,
    requirements: DataType.TEXT,
    rawData: {
        type: DataType.TEXT,
        field: 'raw_data'
    }
}, {
    underscored: true,
    tableName: 'additional_education',

    classMethods: {
        associate: function(models) {
            AdditionalEducation.belongsTo(
                models.School,
                {
                    foreignKey: 'school_id'
                }
            );
            AdditionalEducation.belongsTo(
                models.AdditionalEducationSphere,
                {
                    foreignKey: 'sphere_id',
                    as: 'sphere'
                }
            );
        }
    }
});

export {AdditionalEducation as Model};
