'use strict';

let DataType = require('sequelize');
let db = require('../../../../app/components/db');

let AdminUser = db.define('AdminUser', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    },
    userId: {
        allowNull: false,
        unique: true,
        type: DataType.INTEGER,
    },
    accessAttributes: {
        type: DataType.JSONB,
    },
    createdAt: {
        field: 'created_at',
        type: DataType.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataType.DATE
    },
}, {
    underscored: true,
    tableName: 'admin_user',
    classMethods: {
        associate: function(models) {

        }
    }
});

module.exports = AdminUser;
