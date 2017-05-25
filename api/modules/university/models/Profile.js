"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const Profile = sequelize.define('Profile', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    }
}, {
    underscored: true,
    tableName: 'profile',
    classMethods: {
        associate: function (models) {
            this.belongsToMany(models.University, {
                as: 'universities',
                through: 'university_profile',
                foreignKey: 'profile_id',
            });
        }
    }
});
exports.Model = Profile;
