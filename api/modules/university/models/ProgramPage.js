"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const ProgramPage = sequelize.define('ProgramPage', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    programId: {
        unique: true,
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'program_id',
        references: {
            model: 'program',
            key: 'id'
        }
    },
    pageId: {
        unique: true,
        allowNull: false,
        onUpdate: 'cascade',
        type: DataType.INTEGER,
        field: 'page_id',
        references: {
            model: 'page',
            key: 'id'
        }
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
    tableName: 'program_page',
    classMethods: {
        associate: function (models) {
            this.belongsTo(models.Page, {
                foreignKey: 'page_id',
                as: 'page'
            });
        }
    }
});
exports.Model = ProgramPage;
