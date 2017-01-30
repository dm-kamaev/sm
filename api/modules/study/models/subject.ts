const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface SubjectAttribute {
    name: string;
    displayName: string;
    alias: string;
}

export interface SubjectInstance
    extends Sequelize.Instance<SubjectAttribute>,
            SubjectAttribute {}

const Subject = db.define('Subject', {
    name: {
        type: DataType.STRING,
        unique: true
    },
    displayName: {
        type: DataType.STRING,
        field: 'display_name'
    },
    alias: {
        type: DataType.STRING
    }
}, {
    underscored: true,
    tableName: 'subject',
    classMethods: {
        associate: function(models) {
            Subject.hasMany(models.GiaResult, {
                as: 'giaResult', foreignKey: 'subject_id'
            });
            Subject.hasMany(models.EgeResult, {
                as: 'egeResult', foreignKey: 'subject_id'
            });
            Subject.hasMany(models.OlimpResult, {
                as: 'olimpResult', foreignKey: 'subject_id'
            });
            Subject.hasMany(models.CityResult, {
                as: 'cityResult', foreignKey: 'subject_id'
            });
        }

    }
});

export default Subject;
