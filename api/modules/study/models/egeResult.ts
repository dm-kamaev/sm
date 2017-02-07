const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface EgeResultAttribute {
    id?: number;
    count: number;
    subjectId: number;
    schoolId: number;
    passedCount: number;
    result: number;
    year: number;
}

export interface EgeResultInstance
    extends Sequelize.Instance<EgeResultAttribute>,
            EgeResultAttribute {}

interface EgeResultModel
    extends Sequelize.Model<EgeResultInstance, EgeResultAttribute> {}

const EgeResult: EgeResultModel = db.define('EgeResult', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    },
    year: {
        type: DataType.INTEGER,
        allowNull: false
    },
    result: {
        type: DataType.FLOAT,
        allowNull: false
    },
    passedCount: {
        type: DataType.INTEGER,
        field: 'passed_count'
    }
}, {
    underscored: true,
    tableName: 'ege_result',
    classMethods: {
        associate: function(models) {
            EgeResult.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            EgeResult.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
        }
    }
});

export {EgeResult as Model};
