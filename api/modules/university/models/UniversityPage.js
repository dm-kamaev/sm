"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const UniversityPage = sequelize.define('UniversityPage', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    universityId: {
        unique: 'compositeIndex',
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'university_id',
        references: {
            model: 'university',
            key: 'id'
        }
    },
    pageId: {
        unique: 'compositeIndex',
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
    tableName: 'university_page',
    classMethods: {
        associate: function (models) {
            this.belongsTo(models.Page, {
                foreignKey: 'page_id',
                as: 'page'
            });
        }
    }
});
exports.Model = UniversityPage;
