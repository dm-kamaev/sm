const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface GiaResultAttribute {
    id: number;
    count: number;
    subjectId: number;
    schoolId: number;
    result: number;
    year: number;
}

export interface GiaResultInstance
    extends Sequelize.Instance<GiaResultAttribute>,
            GiaResultAttribute {}

interface GiaResultModel
    extends Sequelize.Model<GiaResultInstance, GiaResultAttribute> {}


const GiaResult: GiaResultModel = db.define('GiaResult', {
    count: {
        type: DataType.INTEGER,
        allowNull: false
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    },
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    result: {
        type: DataType.FLOAT,
        allowNull: false
    }
}, {
    underscored: true,
    tableName: 'gia_result',
    classMethods: {
        associate: function(models) {
            GiaResult.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            GiaResult.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
        }
    }
});

export {GiaResult as Model};
