const DataType = require('sequelize');

const sequelize = require('../../../../app/components/db');
const userType = require('../enums/userType');

import * as Sequelize from 'sequelize/v3';

import {UserDataAttributes, UserDataInstance} from '../types/userData';

interface UserDataModel
    extends Sequelize.Model<UserDataInstance, UserDataAttributes> {}

const Model: UserDataModel = sequelize.define('UserData', {
    userType: {
        field: 'user_type',
        type: DataType.STRING,
        validate: {
            isIn: [userType.toArray()]
        }
    },
    grade: {
        type: DataType.INTEGER,
        field: 'grade'
    },
    yearGraduate: {
        type: DataType.INTEGER,
        field: 'year_graduate'
    },
    userId: {
        field: 'user_id',
        type: DataType.INTEGER
    },
    key: {
        field: 'key',
        type: DataType.STRING
    },
    username: {
        field: 'username',
        type: DataType.STRING
    }
}, {
    underscored: true,
    tableName: 'user_data',
    classMethods: {
        associate: function(models) {
            this.hasOne(models.Comment, {
                as: 'comment',
                foreignKey: 'user_data_id'
            });
            this.hasOne(models.ProgramComment, {
                as: 'programComment',
                foreignKey: 'user_data_id'
            });
        }
    }
});

export {Model};
