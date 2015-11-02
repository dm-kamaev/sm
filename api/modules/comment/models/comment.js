var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');


var Comment = db.define('Comment', {
    text: {
        type: DataType.TEXT,
        allowNull: false
    },
    userType: {
        field: "user_type",
        type: DataType.ENUM('Parent','Graduate','Scholar'),
        allowNull: false
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
        allowNull: false
    },
}, {
    underscored: true,
    tableName: 'comment',
    classMethods: {
        associate: function (models) {
            Comment.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id'
            });
        }
    }
});

module.exports = Comment;
