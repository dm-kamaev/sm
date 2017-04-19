const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export interface EntranceStatisticAttribute {
    id?: number;
    programId?: number;
    year?: number;
    competition?: number;
    budgetPlaces?: number;
    commercialPlaces?: number;
    cost?: number;
    discount?: boolean;
    egePassScore?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface EntranceStatisticInstance
    extends
        Sequelize.Instance<EntranceStatisticAttribute>,
        EntranceStatisticAttribute {}

interface EntranceStatisticModel
    extends Sequelize.Model<
            EntranceStatisticInstance,
            EntranceStatisticAttribute
        > {}

const EntranceStatistic: EntranceStatisticModel
    = sequelize.define('EntranceStatistic', {
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
    year: {
        type: DataType.INTEGER,
    },
    competition: {
        type: DataType.FLOAT,
    },
    budgetPlaces: {
        type: DataType.INTEGER,
        field: 'budget_places',
    },
    commercialPlaces: {
        type: DataType.INTEGER,
        field: 'commercial_places',
    },
    cost: {
        type: DataType.INTEGER,
    },
    discount: {
        type: DataType.BOOLEAN,
    },
    egePassScore: {
        type: DataType.INTEGER,
        field: 'ege_pass_score',
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
    tableName: 'entrance_statistic',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Program, {
                as: 'program',
                foreignKey: 'program_id',
            });
        }
    }
});

export {EntranceStatistic as Model};
