const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export interface ProfileAttribute {
    id?: number;
    name?: string;
}

export interface ProfileInstance
    extends Sequelize.Instance<ProfileAttribute>, ProfileAttribute {}

interface ProfileModel
    extends Sequelize.Model<ProfileInstance, ProfileAttribute> {}

const Profile: ProfileModel = sequelize.define('Profile', {
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
        associate: function(models) {
            this.belongsToMany(models.University, {
                through: 'university_profile'
            });
        }
    }
});

export {Profile as Model};
