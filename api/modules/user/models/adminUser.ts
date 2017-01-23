const DataType = require('sequelize');
const db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export type AccessAttributes = {
    schoolId?: number,
    brandId?: number,
    isSuperUser?: boolean
};

export interface AdminUserAttribute {
    id?: number;
    userId: number;
    accessAttributes?: AccessAttributes;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AdminUserInstance
    extends Sequelize.Instance<AdminUserAttribute>, AdminUserAttribute {}

export interface AdminUserModel
    extends Sequelize.Model<AdminUserInstance, AdminUserAttribute> {}

const AdminUser: AdminUserModel = db.define('AdminUser', {
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

export default AdminUser;
