var DataType = require('sequelize'),
    db = require.main.require('./app/components/db'),
    enums = require('../enums');


var Comment = db.define('Comment', {
    text: DataType.TEXT,
    ratingId: {
        type: DataType.INTEGER,
        field: 'rating_id'
    },
    userType: {
        field: 'user_type',
        type: DataType.ENUM,
        values: enums.authorType.toArray()
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
