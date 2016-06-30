'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../../../app/components/db'),
    seoListType = require('../enums/seoListType'),
    seoListGeoType = require('../enums/seoListGeoType');

var SeoSchoolList = sequelize.define(
    'SeoSchoolList',
    {
        description: {
            field: 'text',
            type: Sequelize.STRING
        },
        seoText: {
            field: 'seo_text',
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        searchParameters: {
            field: 'search_parameters',
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
        },
        listType: {
            field: 'list_type',
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [seoListType.toArray()]
            }
        },
        geoType: {
            field: 'geo_type',
            type: Sequelize.STRING,
            validate: {
                isIn: [seoListGeoType.toArray()]
            }
        }
    },
    {
        underscored: true,
        tableName: 'seo_school_list'
    }
);

module.exports = SeoSchoolList;
