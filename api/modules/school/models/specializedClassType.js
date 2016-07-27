'use strict';

var Sequelize = require('sequelize'),
    db = require('../../../../app/components/db');

var SpecializedClassType = db.define(
    'SpecializedClassType',
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
        tableName: 'specialized_class_type'
    }
);

module.exports = SpecializedClassType;
