var DataType = require('sequelize'),
    authorType = require('../enums/authorType');
var db = require('../../../../app/components/db');


var Comment = db.define('Comment', {
    text: DataType.TEXT,
    ratingId: {
        type: DataType.INTEGER,
        field: 'rating_id'
    },
    userDataId: {
        type: DataType.INTEGER,
        field: 'user_data_id'
    },
    isNoticeSend: {
        type: DataType.BOOLEAN,
        field: 'is_notice_send'
    },
    groupId: {
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
            Comment.belongsTo(models.UserData, {
                as: 'userData',
                foreignKey: 'user_data_id'
            });
        }
    }
});

module.exports = Comment;
