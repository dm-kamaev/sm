var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');


var Comment = db.define('Comment', {
    text: {
        type: DataType.TEXT,
        //allowNull: false
    },
    userType: {
        field: "user_type",
        type: DataType.ENUM,
        values: ['Parent','Graduate','Scholar']
       // allowNull: false
    },
}, {
    underscored: true,
    tableName: 'comment',
    classMethods: {
        associate: function (models) {
            Comment.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id'
            });
            Comment.hasOne(models.Rating, {
                foreignKey: 'comment_id'
            })
        }
    }
});

module.exports = Comment;
