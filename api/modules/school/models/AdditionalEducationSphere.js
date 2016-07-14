'use strict';

var Sequelize = require('sequelize'),
    db = require('../../../../app/components/db');

var AdditionalEducationSphere = db.define(
    'AdditionalEducationSphere',
    {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: Sequelize.STRING,
        popularity: Sequelize.INTEGER
    },
    {
        underscored: true,
        tableName: 'additional_education_sphere',
        classMethods: {
            associate: function(models) {
                AdditionalEducationSphere.hasMany(
                    models.AdditionalEducation,
                    {
                        foreignKey: 'sphere_id',
                        onDelete: 'cascade'
                    }
                );
            }
        }
    }
);

module.exports = AdditionalEducationSphere;

