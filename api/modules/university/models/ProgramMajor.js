"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const ProgramMajor = sequelize.define('ProgramMajor', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataType.STRING,
    popularity: DataType.INTEGER,
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
    tableName: 'program_major',
    classMethods: {
        associate: function (models) {
            this.hasMany(models.Program, {
                as: 'programs',
                foreignKey: 'program_major_id'
            });
            this.belongsToMany(models.CourseType, {
                through: 'program_major_course_type',
                foreignKey: 'program_major_id',
                as: 'courseTypes'
            });
        }
    }
});
exports.Model = ProgramMajor;
