var db = require.main.require('./app/components/db');

var CommentGroup = db.define('CommentGroup', {}, {
    underscored: true,
    tableName:'comment_group',
    classMethods: {
        associate: function (models) {
            CommentGroup.hasMany(models.Comment, {
                as: 'comments', foreignKey: 'comment_group_id'
            });
        }
    }
});

module.exports = CommentGroup;
