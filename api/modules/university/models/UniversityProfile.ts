const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface UniversityProfileAttribute {
    id?: number;
    universityId?: number;
    profileId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UniversityProfileInstance
    extends Sequelize.Instance<UniversityProfileAttribute>,
            UniversityProfileAttribute {}

interface UniversityProfileModel
    extends Sequelize.Model<
    UniversityProfileInstance, UniversityProfileAttribute
    > {}

const UniversityProfile: UniversityProfileModel
    = sequelize.define('UniversityProfile', {
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
    profileId: {
        unique: 'compositeIndex',
        allowNull: false,
        onUpdate: 'cascade',
        type: DataType.INTEGER,
        field: 'profile_id',
        references: {
            model: 'profile',
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
    tableName: 'university_profile',
    classMethods: {
        associate: function(models) {

        }
    }
});

export {UniversityProfile as Model};
