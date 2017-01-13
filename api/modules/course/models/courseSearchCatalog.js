'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db');
const enumTypes = require('../enums/searchCatalog.js');

let CourseSearchCatalog = db.define('CourseSearchCatalog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        validate: {
            isIn: [ enumTypes.toArray() ]
        }
    },
    'created_at': Sequelize.DATE,
    'updated_at': Sequelize.DATE,
}, {
    underscored: true,
    tableName: 'course_search_catalog',
    classMethods: {
        associate: function(models) {

        }
    }
});

module.exports = CourseSearchCatalog;
