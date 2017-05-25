"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const Model = sequelize.define('ProgramComment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
    },
    pros: {
        type: DataType.TEXT
    },
    cons: {
        type: DataType.TEXT
    },
    advice: {
        type: DataType.TEXT
    },
    commentGroupId: {
        field: 'comment_group_id',
        type: DataType.INTEGER,
    },
    userDataId: {
        field: 'user_data_id',
        type: DataType.INTEGER,
    },
    ratingId: {
        field: 'rating_id',
        type: DataType.INTEGER,
    },
    isNoticeSend: {
        field: 'is_notice_send',
        defaultValue: false,
        type: DataType.BOOLEAN
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
    tableName: 'program_comment',
    classMethods: {
        associate: function (models) {
            this.belongsTo(models.CommentGroup, {
                as: 'commentGroup',
                foreignKey: 'comment_group_id'
            });
            this.belongsTo(models.Rating, {
                as: 'rating',
                foreignKey: 'rating_id'
            });
            this.belongsTo(models.UserData, {
                as: 'userData',
                foreignKey: 'user_data_id'
            });
        }
    }
});
exports.Model = Model;
