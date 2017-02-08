const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

const awardeeType = require('../enums/olimpStatusType');
const olympiadType = require('../enums/olimpType');

import * as Sequelize from 'sequelize/v3';

export interface OlympiadResultAttribute {
    id?: number;
    schoolId?: number;
    subjectId?: number;
    type?: string;
    stage?: number;
    class?: number;
    status?: string;
    year?: number;
    amount?: number;
}

export interface OlympiadResultInstance
    extends Sequelize.Instance<OlympiadResultAttribute>,
        OlympiadResultAttribute {}

interface OlympiadResultModel
    extends Sequelize.Model<OlympiadResultInstance, OlympiadResultAttribute> {}

const OlympiadResult: OlympiadResultModel = db.define('OlimpResult', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    subjectId: {
        type: DataType.INTEGER,
        field: 'subject_id'
    },
    type: {
        type: DataType.STRING,
        validate: {
            isIn: [olympiadType.toArray()]
        }
    },
    stage: {
        type: DataType.INTEGER
    },
    class: {
        type: DataType.INTEGER
    },
    status: {
        type: DataType.STRING,
        validate: {
            isIn: [awardeeType.toArray()]
        }
    },
    year: {
        type: DataType.INTEGER
    },
}, {
    underscored: true,
    tableName: 'olimp_result',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            this.belongsTo(models.Subject, {
                foreignKey: 'subject_id',
                as: 'subject'
            });
        }
    }
});

export {OlympiadResult as Model};
