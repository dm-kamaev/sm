'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db');

let SeoCourseList = db.define('SeoCourseList', {
    tabTitle: {
        type: Sequelize.STRING,
        field: 'tab_title'
    },
    metaDescription: {
        type: Sequelize.STRING,
        field: 'meta_description'
    },
    categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: {
            model: 'course_category',
            key: 'id'
        },
        onDelete: 'cascade'
    },
    openGraphTitle: {
        type: Sequelize.STRING,
        field: 'open_graph_title'
    },
    openGraphDescription: {
        type: Sequelize.STRING,
        field: 'open_graph_description'
    },
    listTitle: {
        type: Sequelize.STRING,
        field: 'list_title'
    },
    text: Sequelize.ARRAY(Sequelize.STRING),
}, {
    underscored: true,
    tableName: 'seo_course_list',
    classMethods: {
        associate: function(models) {
            SeoCourseList.belongsTo(models.CourseCategory, {
                as: 'category',
                foreignKey: 'category_id',
                onDelete: 'cascade'
            });
        }
    }
});

module.exports = SeoCourseList;
