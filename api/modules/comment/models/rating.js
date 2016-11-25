var DataType = require('sequelize');

var db = require('../../../../app/components/db');

var Rating = db.define('Rating', {
    score: {
        type: DataType.ARRAY(DataType.INTEGER),
        validate: {
            isRightCount: function(value) {
                if (value.length != 4) {
                    throw new Error('Expected 4 numbers');
                }
            },
            isRightFormat: function(value) {
                for (var i = 0; i < value.length; i++) {
                    if (value[i] < 0 || value[i] > 5) {
                        throw new Error('Every number must be from 0 to 5');
                    }
                }
            }
        }
    },
    totalScore: {
        type: DataType.FLOAT,
        field: 'total_score'
    }
}, {
    underscored: true,
    tableName: 'rating',
    classMethods: {
        associate: function(models) {
            Rating.hasOne(models.Comment, {
                foreignKey: 'rating_id'
            });
        }
    }
});

module.exports = Rating;
