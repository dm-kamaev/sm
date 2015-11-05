var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Rating = db.define('Rating', {
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

    classMethods: {
        associate: function (models) {
            Rating.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            Rating.belongsTo(models.Comment, {
                foreignKey: 'comment_id'
            });
        }
    }
});

module.exports = Rating;
