var DataType = require('sequelize');
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
    source: {
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'User',
        field: 'source'
        // validate: {
        //     isIn: sourceType
        // }
    },
    isNoticeSend: {
        type: DataType.BOOLEAN,
        field: 'is_notice_send'
    },
    groupId: {
        type: DataType.INTEGER,
        field: 'comment_group_id'
    },
    createdAt: {
        type: DataType.DATE,
        field: 'created_at'
    }
}, {
    underscored: true,
    tableName: 'comment',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id'
            });
            this.belongsTo(models.Rating, {
                as: 'rating',
                foreignKey: 'rating_id'
            });
            this.belongsTo(models.UserData, {
                as: 'userData',
                foreignKey: 'user_data_id'
            });
        }
    }
});

module.exports = Comment;
