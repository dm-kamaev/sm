const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface UniversityAttribute {
    id?: number;
    name?: string;
    abbreviation?: string;
    description?: string;
    imageUrl?: string;
    links?: string;
    militaryDepartment?: boolean;
    dormitory?: boolean;
    cityId?: number;
}

interface UniversityInstance
    extends Sequelize.Instance<UniversityAttribute>, UniversityAttribute {}

interface UniversityModel
    extends Sequelize.Model<UniversityInstance, UniversityAttribute> {}

const University: UniversityModel = sequelize.define('University', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    abbreviation: DataType.STRING,
    description: DataType.TEXT,
    imageUrl: {
        type: DataType.STRING(511),
        field: 'image_url'
    },
    links: DataType.ARRAY(DataType.STRING),
    militaryDepartment: {
        type: DataType.BOOLEAN,
        field: 'military_department'
    },
    dormitory: DataType.BOOLEAN,
    cityId: {
        type: DataType.INTEGER,
        field: 'city_id',
        references: {
            model: 'city',
            key: 'id'
        }
    }
}, {
    underscored: true,
    tableName: 'university',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.City, {
                foreignKey: 'city_id',
                as: 'city'
            });
            this.belongsToMany(models.Profile, {
                through: 'university_profile'
            });
        }
    }
});

export {University as Model};
