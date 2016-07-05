'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../../../app/components/db'),
    seoListType = require('../enums/seoListType'),
    seoListGeoType = require('../enums/seoListGeoType');

var SeoSchoolList = sequelize.define(
    'SeoSchoolList',
    {
        seoTitle: {
            field: 'seo_title',
            type: Sequelize.STRING
        },
        seoDescription: {
            field: 'seo_description',
            type: Sequelize.STRING
        },
        title: {
            field: 'title',
            type: Sequelize.STRING
        },
        text: {
            field: 'text',
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        searchParameters: {
            field: 'search_parameters',
            allowNull: false,
            type: Sequelize.STRING
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
