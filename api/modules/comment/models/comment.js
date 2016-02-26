var DataType = require('sequelize'),
    authorType = require('../enums/authorType');
var db = require('../../../../app/components/db');


var Comment = db.define('Comment', {
    text: DataType.TEXT,
    ratingId: {
        type: DataType.INTEGER,
        field: 'rating_id'
    },
    userType: {
        field: 'user_type',
        type: DataType.ENUM,
        values: authorType.toArray()
    },
    commentGroupId: {
        type: DataType.INTEGER,
        field: 'comment_group_id'
    }
}, {
    underscored: true,
    tableName: 'comment',
    classMethods: {
        associate: function (models) {
            Comment.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id'
            });
            Comment.belongsTo(models.Rating, {
                as: 'rating',
                foreignKey: 'rating_id'
            });
        }
    }
});

module.exports = Comment;
