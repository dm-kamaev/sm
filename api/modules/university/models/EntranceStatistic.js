"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const EntranceStatistic = sequelize.define('EntranceStatistic', {
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
        associate: function (models) {
            this.belongsTo(models.Program, {
                as: 'program',
                foreignKey: 'program_id',
            });
        }
    }
});
exports.Model = EntranceStatistic;
