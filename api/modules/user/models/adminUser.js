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
    'created_at': {
        allowNull: false,
        type: DataType.DATE
    },
    'updated_at': {
        allowNull: false,
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
