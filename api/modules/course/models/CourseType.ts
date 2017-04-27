const DataType = require('sequelize');
import * as Sequelize from 'sequelize/v3';

const db = require('../../../../app/components/db');

import {
    CourseTypeAttribute,
    CourseTypeInstance
} from '../types/courseType';

interface CourseTypeModel extends
        Sequelize.Model<CourseTypeInstance, CourseTypeAttribute> {}

const CourseType: CourseTypeModel = db.define('CourseType', {
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    popularity: DataType.INTEGER,
    categoryId: {
        type: DataType.INTEGER,
        field: 'category_id'
    }
}, {
    underscored: true,
    tableName: 'course_type',
    classMethods: {
        associate: function(models) {
            CourseType.hasMany(models.Course, {
                as: 'courses',
                foreignKey: 'type'
            });
            CourseType.belongsTo(models.CourseCategory, {
                as: 'category',
                foreignKey: 'category_id',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
        }
    }
});

export {CourseType as Model};
