var DataType = require('sequelize'),
    schoolService = require('../services/school');
var db = require('../../../../app/components/db');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var onChangeHook = async(function(rating) {
    await(schoolService.onRatingChange(rating.schoolId));
});

var Rating = db.define('Rating', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    score: {
        type: DataType.ARRAY(DataType.INTEGER),
        validate: {
            isRightCount: function(value) {
                if (value.length != 4)
                    throw new Error('Expected 4 numbers');
            },
            isRightFormat : function(value) {
                for (var i = 0; i < value.length; i++)
                    if (value[i] < 0 || value[i] > 5)
                        throw new Error('Every number must be from 0 to 5');
            }
        },
        //allowNull: false
    }
}, {
    underscored: true,
    tableName: 'rating',
    hooks: {
        afterUpdate: onChangeHook,
        afterCreate: onChangeHook,
        afterDestroy: onChangeHook
    },
    classMethods: {
        associate: function (models) {
            Rating.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            Rating.hasOne(models.Comment, {
                foreignKey: 'rating_id'
            });

        }
    }
});

module.exports = Rating;
